export async function sendTokenOnTheEmail(url: string, email: string) {
    const body = {
        email, 
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
    });

    return response;
}
