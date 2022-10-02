
const btn = document.getElementById('btn');
const ImgD = document.getElementById('imgC');

async function getOne() {
    const name = document.querySelector("#name").value;
    const base = "https://www.instagram.com/"
    const url = "/?__a=1"
    const fullUrl = base + name + url 
    fetch(fullUrl)
        .then((data) => {
            if (data.ok) {
                return data.json()
            }
            throw new Error('Response not ok.');
        })
        .then(feed => generateHtml(feed))
        .catch(error => console.error('Error:', error))


}

const generateHtml = (data) => {
    // console.log(data);
    data.graphql.user.edge_owner_to_timeline_media.edges.forEach(images => {
        const img = document.createElement("img")
        img.src = images.node.display_url;
        img.style.width = "100%"
        img.style.height = "100%"
        ImgD.appendChild(img)
        ImgD.appendChild(document.createElement("br"))
        ImgD.appendChild(document.createElement("br"))
        ImgD.appendChild(document.createElement("br"))

    });

    const html = `
        <img src=${data.graphql.user.profile_pic_url}>
        <div class="name"> 
            <span> ${data.graphql.user.full_name} </span> <br/>
            <span> ${data.graphql.user.biography} </span>
        </div>
        
        <div class="details">
            <span>Following: ${data.graphql.user.edge_follow.count}</span> 
            <span>Followers: ${data.graphql.user.edge_followed_by.count}</span> <br/>
            <span>Posts: ${data.graphql.user.edge_owner_to_timeline_media.count}</span> 
            <span>Email: ${data.graphql.user.business_email}</span> 
            <span>Category: ${data.graphql.user.business_category_name}</span>
        </div>
    `

    const feedDiv = document.querySelector('.feed')
    feedDiv.innerHTML = html
}
