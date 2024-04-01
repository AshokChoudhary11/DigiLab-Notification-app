import * as OneSignal from '@onesignal/node-onesignal'
const appKeyProvider = {
    getToken() {
        return process.env.ONE_SIGNAL_REST_API_KEY!
    },
}
const configParams = {
    userKey: process.env.ONE_SIGNAL_USER_AUTH_KEY!,
    appKey: process.env.ONE_SIGNAL_APP_ID!,
    authMethods: {
        app_key: {
            tokenProvider: appKeyProvider,
        },
    },
}

const configuration = OneSignal.createConfiguration(configParams)

export async function POST(request: Request) {
    const messageObject = await request.json()
    const messageHeading = messageObject.heading
    const messageContent = messageObject.content
    const messageName = messageObject.name

    const client = new OneSignal.DefaultApi(configuration)
    const notification = new OneSignal.Notification()
    notification.app_id = configParams.appKey
    notification.name = messageName || 'Test Notification'
    notification.headings = {
        en: messageHeading || 'Test Heading',
    }
    notification.contents = {
        en: messageContent || 'Test Message',
    }
    notification.included_segments = ['All']

    const notificationResponse = await client.createNotification(notification)
    return new Response(JSON.stringify(notificationResponse), {
        status: 200,
    })
}