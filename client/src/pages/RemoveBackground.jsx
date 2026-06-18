import React, { useContext, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext'

const RemoveBackground = () => {
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const { removeBackground, token, setShowLogin } = useContext(AppContext)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setSelectedFile(file)
    setResult(null)
    setPreview(URL.createObjectURL(file))
  }

  const onFileChange = (e) => {
    handleFile(e.target.files?.[0])
  }

  const onDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!token) {
      setShowLogin(true)
      return
    }

    if (!selectedFile) return

    setLoading(true)
    const resultImage = await removeBackground(selectedFile)
    if (resultImage) {
      setResult(resultImage)
    }
    setLoading(false)
  }

  const reset = () => {
    setPreview(null)
    setResult(null)
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center px-4'
    >
      <h1 className='text-3xl sm:text-4xl font-semibold text-neutral-800 mb-2 text-center'>
        Remove Background
      </h1>
      <p className='text-neutral-500 text-center max-w-md mb-8'>
        Upload an image and get a clean cutout with the background removed. Uses 1 credit per image.
      </p>

      <div className='relative'>
        <div
          className={`rounded-lg overflow-hidden ${result ? 'bg-[length:16px_16px] bg-[position:0_0,8px_8px] bg-[image:linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc)]' : ''}`}
        >
          <img
            src={result || preview}
            alt=''
            className='max-w-sm sm:max-w-md rounded'
          />
        </div>
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-500 rounded ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}
        />
      </div>

      <p className={loading ? 'mt-4 text-neutral-600' : 'hidden'}>Removing background...</p>

      {!result && (
        <div className='w-full max-w-xl mt-10'>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className='border-2 border-dashed border-neutral-400 rounded-2xl p-10 text-center cursor-pointer hover:border-neutral-600 hover:bg-white/50 transition-all'
          >
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={onFileChange}
              className='hidden'
            />
            <p className='text-neutral-600 font-medium'>
              {preview ? 'Click to choose a different image' : 'Drag & drop an image here, or click to upload'}
            </p>
            <p className='text-sm text-neutral-400 mt-2'>PNG, JPG, WEBP supported</p>
          </div>

          {preview && (
            <button
              type='submit'
              disabled={loading}
              className='w-full mt-6 bg-zinc-900 text-white py-3 rounded-full hover:scale-[1.02] transition-all disabled:opacity-50'
            >
              Remove Background
            </button>
          )}
        </div>
      )}

      {result && (
        <div className='flex gap-3 flex-wrap justify-center mt-10'>
          <button
            type='button'
            onClick={reset}
            className='border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-neutral-100 transition-all'
          >
            Upload Another
          </button>
          <a
            href={result}
            download='revopix-no-bg.png'
            className='bg-black text-white px-10 py-3 rounded-full cursor-pointer hover:scale-105 transition-all'
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  )
}

export default RemoveBackground
