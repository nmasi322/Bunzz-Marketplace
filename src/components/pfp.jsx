import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'

const Pfp = () => {
  function getImageFileObject(imageFile) {
    console.log({ imageFile })
  }
  function runAfterImageDelete(file) {
    console.log({ file })
  }
  return (
    <ImageUploader
      onFileAdded={(img) => getImageFileObject(img)}
      onFileRemoved={(img) => runAfterImageDelete(img)}
      style={{ height: 150, width: 150, zIndex: "10000000000", margin: "0 20px", background: '#f9f9f9', borderRadius: "500px" }}
        deleteIcon={
        <img className='w-4 h-4 mx-2'
            src='https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png'
            alt=''
        />
    }
    uploadIcon={
        <svg
            className='svg-circleplus'
            viewBox='0 0 100 100'
            style={{ height: '40px', stroke: '#000' }}
        >
        <circle cx='50' cy='50' r='45' fill='none' strokeWidth='7.5'></circle>
        <line x1='32.5' y1='50' x2='67.5' y2='50' strokeWidth='5'></line>
        <line x1='50' y1='32.5' x2='50' y2='67.5' strokeWidth='5'></line>
    </svg>
  }
    />
  )
}

export default Pfp