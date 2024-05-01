// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const useFetch = (instance, options = {}, defaultDataValue = null) => {
//   const [data, setData] = useState(defaultDataValue)
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await instance axios(instance, options)
//         setData(response.data)
//       } catch (error) {
//         setError(error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [url, options])

//   return { data, error, loading }
// }

// export default useFetch
