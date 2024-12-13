const DEV_BASE_URL = 'https://aitarot.io/'
const PROD_BASE_URL = 'https://aitarot.io/'

export const baseUrls = {
    'prod':PROD_BASE_URL,
    'dev':DEV_BASE_URL,
}

const getBaseUrl = () => {
    switch (process.env.NEXT_PUBLIC_SERVER) {
        case 'dev':
            return baseUrls.dev
        case 'prod':
            return baseUrls.prod
        default: return baseUrls.dev
    }
}

const BASE_URL = getBaseUrl()

export default BASE_URL
