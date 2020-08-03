const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Unsplash API
const count = 10
const apiKey = 'YOUR_KEY'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
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
  })
  console.log(photosArray)
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

// On Load
getPhotos()
