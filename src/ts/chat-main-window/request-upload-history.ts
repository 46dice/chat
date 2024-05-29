export async function uploadHistoryRequest(url: string, token: string): Promise<Response> {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
}
