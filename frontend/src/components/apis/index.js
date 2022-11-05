
import axios from "axios"

// export const url = 'http://localhost:8080/api'
export const url = 'https://vivretickets.com/api'

export const loginUser = async (credentials) => {
  return fetch(`${url}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

export const registerUser = async (credentials) => {
  return fetch(`${url}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
}

export const changeEmail = async (header, evt) => {
  return fetch(`${url}/users/change_email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
}

export const changePassword = async (header, evt) => {
  return fetch(`${url}/users/change_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
}

export const updateActivity = async (header, evt) => {
  return fetch(`${url}/activities/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
}

export const addEvent = async (header, evt) => {
  return fetch(`${url}/events/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
  .then(data => data.json())
} 

export const getEvents = async () => {
  return fetch(`${url}/events`)
    .then(data => data.json())
}

export const getEvent = async (id) => {
  return fetch(`${url}/events/${id}`)
    .then(data => data.json())
}

export const getEventByUser = async (mail) => {
  return fetch(`${url}/events/email/${mail}`)
    .then(data => data.json())
}

export const getUsers = async () => {
  return fetch(`${url}/users`)
    .then(data => data.json())
}

export const getUser = async ( mail ) => {
  return fetch(`${url}/users/${mail}`)
    .then(data => data.json())
}

export const getUserById = async (id) => {
  return fetch(`${url}/users/id/${id}`)
    .then(data => data.json())
}

export const uploadImage = async (evt) => {
  const formData = new FormData()
  formData.append('name', evt.name)
  formData.append('logo', evt)
  const result = await axios.post(`${url}/events/upload-img`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return result
}

export const buyTicket = async (header, evt) => {
  return fetch(`${url}/activities/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
  .then(data => data.json())
}

export const updateEventCount = async( header, id, evt ) => {
  return fetch(`${url}/events/update_count/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  }) 
  .then(data => data.json())
}

export const updateEvent = async (header, id, evt) => {
  return fetch(`${url}/events/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
  .then(data => data.json())
}

export const publishEvent = async (header, evt) => {
  return fetch(`${url}/events/publish/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
  .then(data => data.json())
}

export const getActivity = async ( id ) => {
  return fetch(`${url}/activities/act_per_event/${id}`)
    .then((data) => data.json())
}

export const getActivityByUser = async (user) => {
  return fetch(`${url}/activities/act_per_user/${user}`)
    .then((data) => data.json())
}

export const getActivityById = async ( id ) => {
  return fetch(`${url}/activities/${id}`)
    .then((data) => data.json())
}

export const verifyEmail = async ( key ) => {
  return fetch(`${url}/users/confirm/${key}`)
    .then((data) => data.json())
}

export const deleteEvent = async (header, id) => {
  return fetch(`${url}/events/remove/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': header  
      },
    })
    .then((data) => data.json())
}

export const getContents = async () => {
  return fetch(`${url}/content/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((data) => data.json())
}

export const updateContent = async (header, id, evt) => {
  return fetch(`${url}/content/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
  .then((data) => data.json())
}

export const addContent = async (header, evt) => {
  return fetch(`${url}/content/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'X-Auth-Token': header
    },
    body: JSON.stringify(evt)
  })
  .then((data) => data.json())
}

export const deleteContent = async (header, id) => {
  return fetch(`${url}/content/remove/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'X-Auth-Token': header
    }
  })
  .then((data) => data.json())
}

export const getTermsConditions = async () => {
  return fetch(`${url}/content/terms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((data) => data.json())
}