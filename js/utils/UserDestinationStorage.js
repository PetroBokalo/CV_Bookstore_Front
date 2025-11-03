export function setUserDestination(to) {

    if(!to) {
        console.warn("⚠️ Tried to set an empty destination");
        return;
    }

    sessionStorage.setItem("userDestination", to);
    console.log("✅ User destination set");
}

export function getUserDestination() {
    const userDestination = sessionStorage.getItem("userDestination");
    if(!userDestination) {
        console.warn("⚠️ No destination found in sessionStorage");
    }
    return userDestination;
}

export function removeUserDestination() {
    sessionStorage.removeItem("userDestination");
    console.log("✅ User destination removed");
}