export async function signUp(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match!')
    }

    const response = await fetch("http://localhost:8000/sign-up", {
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }

    return data
}

export async function logIn(email: string, password: string) {
    const response = await fetch("http://localhost:8000/log-in", {
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }

    return data
}
