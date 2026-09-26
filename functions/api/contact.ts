import { Resend } from 'resend';

export function errorResponse(message: string, status: number): Response {
    return Response.json(
        {
            success: false,
            error: message
        },
        {
            status: status,
            headers: { "Content-Type": "application/json" }
        }
    )
}

export async function onRequestPost(context: any): Promise<Response> {
    try {
        const formData = await context.request.formData()

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const message = String(formData.get("message") ?? "").trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name.length == 0) {
            return errorResponse("Name is a required field.", 400)

        } else if (name.length > 100) {
            return errorResponse("Name is too long.", 400)

        } else if (email.length == 0) {
            return errorResponse("Email is a required field.", 400)

        } else if (email.length > 254) {
            return errorResponse("Email is too long.", 400)
        }
        else if (!emailRegex.test(email)) {
            return errorResponse("Please enter a valid email.", 400)

        } else if (message.length == 0) {
            return errorResponse("Message is a required field.", 400)

        } else if (message.length > 3000) {
            return errorResponse("Message is too long. Max 3000 chars", 400)

        } else if (message.length < 15) {
            return errorResponse("Message is too short. Min 15 chars", 400)
        } else {
            const resend = new Resend(context.env.RESEND_API_KEY);

            const { data, error } = await resend.emails.send({
                from: 'noreply@botonauts.uk',
                to: context.env.CONTACT_TO,
                replyTo: email,
                subject: `New Message from Contact Form - ${name}`,
                text: `Received message from:\nName: ${name}\nEmail: ${email}\n\nMessage:\n-------------\n${message}\n-------------\n\nReply to this email to respond.`
            });

            if (error) {
                console.error(error);

                return errorResponse("Failed to send email", 500)
            }

            console.log(`Successfully sent message from ${name} - ${email}`)

            return Response.json(
                {
                    success: true
                },
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                });
        }
    } catch (e) {
        console.error(e);
        return errorResponse("Something went wrong", 500)
    }
}