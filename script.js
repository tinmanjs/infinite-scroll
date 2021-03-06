const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Number of pixels from the bottom to start loading
const triggerPoint = 1000

// Flags in order to control image loading
let readyToLoad = false
let imagesLoaded = 0
let totalImages = 0

// Unsplash API
const imageSetCount = 30
const apiKey = 'YOUR_KEY'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageSetCount}`

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    readyToLoad = true
    loader.hidden = true
  }
}

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    // Create <a> element to link to Unsplash
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    // Create an <img> element for photo
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img)
    imageContainer.appendChild(item)
    // Event Listener, check when each image is finished loading
    img.addEventListener('load', imageLoaded)
  })
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    // Catch error here - If no API_KEY
    photosArray = [{
      alt_description: "person holding white printer paper",
      links: {html: "https://unsplash.com/photos/L7CDWeB2CSk"},
      urls: {regular: "https://images.unsplash.com/photo-1594392175511-30eca83d51c8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1NDA4MH0"}
    },
    {
      alt_description: "woman in black shirt with purple hair",
      links: {html: "https://unsplash.com/photos/L7CDWeB2CSk"},
      urls: {regular: "https://images.unsplash.com/photo-1596212602090-96a97c24694f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE1NDA4MH0"}
    }
    ]
    photosArray.forEach(photo => {
      // Create <a> element to link to Unsplash
      const item = document.createElement('a')
      setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
      })
      // Create an <img> element for photo
      const img = document.createElement('img')
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      })
      // Put <img> inside <a>, then put both inside imageContainer element
      item.appendChild(img)
      imageContainer.appendChild(item)
    })
    displayPhotos()
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - triggerPoint && readyToLoad) {
    getPhotos()
    readyToLoad = false
  }
})

// On Load
getPhotos()
