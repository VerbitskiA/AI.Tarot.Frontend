
const getWebSocketUrl = () => {
    return process.env.NEXT_PUBLIC_SERVER_WS_URL
}

const WS_URL = getWebSocketUrl()

export default WS_URL