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

export async function getAccountInformation(userID: number) {
    const response = await fetch("http://localhost:8000/get-account-information", {
        method: 'POST',
        body: JSON.stringify({
            "user_id": userID,
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

export async function setAccountInformation(userID: number, username: string, universityName: string, subject: string) {
    const response = await fetch("http://localhost:8000/set-account-information", {
        method: 'POST',
        body: JSON.stringify({
            "user_id": userID,
            "username": username,
            "university_name": universityName,
            "subject": subject
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


export async function getUserTimetableInfo(userID: number) {
    const response = await fetch("http://localhost:8000/get-user-tt-link", {
        method: 'POST',
        body: JSON.stringify({
            "user_id": userID
        }),
        headers: {
            'Access-Control-Requested-Method': 'POST',
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }

    return data
}


export async function setUserTimetableInfo(userID: number, ttlink: string, availability: string) {
    const response = await fetch("http://localhost:8000/update-content-information", {
        method: 'POST',
        body: JSON.stringify({
            "user_id": userID,
            "tt_link": ttlink,
            "availability": availability
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

export async function addTimeSlot(newItem: { userID: number, weekID: number, start: number, end: number }) {
    const response = await fetch("http://localhost:8000/add_timeslot", {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Access-Control-Requested-Method': 'POST',
            'Content-Type': 'application/json',
        },
    })

    return await response.json()
}

export async function findStudySlots(userID: number, subject: string) {
    const response = await fetch("http://localhost:8000/get_overlap_timeslots", {
        method: 'POST',
        body: JSON.stringify({
            "userID": userID,
            "subject": subject
        }),
        headers: {
            'Access-Control-Requested-Method': 'POST',
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    // if (!response.ok) {
    //     throw new Error(data.message || 'Something went wrong!')
    // }

    return data
}
