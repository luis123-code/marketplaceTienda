import axios from 'axios'
const supabaseUrl = process.env.NUXT_ENV_SUPABASE_URL
const apiKey = process.env.NUXT_ENV_SUPABASE_API_KEY
export default async function serviceAxios ({ url, body, method = "GET", headers = {}, }) {
    let respuesta = ""
    let service = axios.create({
        baseURL: `${supabaseUrl}`,
    })
    service.defaults.headers.common['Content-Type'] = 'application/json'
    service.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`
    service.defaults.headers.common['apikey'] = apiKey
    headers = {
        ...headers,
        ...service.defaults.headers.common,
    }
    try {
        switch (method.toUpperCase()) {
            case "GET":
                respuesta = await service.get(url, { headers })
                break;
            case "POST":
                respuesta = await service.post(url, body, { headers })
                break;
            case "PUT":
                respuesta = await service.put(url, body, { headers })
                break;
            case "DELETE":
                respuesta = await service.delete(url, { headers })
                break;
            default:
                break;
        }
        return {
            status: respuesta.status,
            data: respuesta.data,
            statusText: respuesta.statusText,
        }
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            statusText: error.response.statusText,
        }
    }
}