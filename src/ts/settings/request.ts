export async function requestChangeName(url: string, email: string, name: string, token: string) {
    const body = {
        name,
        email,
    };

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    return response;
}
