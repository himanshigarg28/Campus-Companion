function loadProfile() {
    const profileData = localStorage.getItem("Campus Profile");
    if (!profileData){
        return;
    }
    const profile = JSON.parse(profileData);
    const topName = document.getElementById("topname");
    if (topName){
        topName.innerText = profile.name;
    }
    const profileName = document.getElementById("profileName");
    if (profileName) {
        profileName.innerText = profile.name;
    }
    const profileFullName = document.getElementById("profileFullName");
    if (profileFullName) {
        profileFullName.innerText = profile.name;
    }
    const profileBranch = document.getElementById("profileBranch");
    if (profileBranch) {
        profileBranch.innerText = profile.branch;
    }
    const profileSemester =
        document.getElementById("profileSemester");
    if (profileSemester) {
        profileSemester.innerText = profile.semester;
    }
}
function editProfile() {
    window.location.href = "setup.html";
}
loadProfile();