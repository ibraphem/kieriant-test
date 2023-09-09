import {CourierClient} from "@trycourier/courier";


const courier = CourierClient({
    authorizationToken: "AUTH_TOKEN",
});




export const smsNotification = (mobileNumber, title, body) => {
    return courier.send({
    message: {
        to: {
            phone_number: mobileNumber,
        },
        content: {
            title: title,
            body: body,
        },
        routing: {
            method: "single",
            channels: ["sms"],
        },
    },
    });
};