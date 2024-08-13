

let data = []

async function getAllimg() {
    const response = await fetch('http://localhost:3000/img')
    const imgs = await response.json()
    data = imgs
    console.log(imgs)


    imgs.map(item => {
        fetch(`http://localhost:3000/img/${item}`, {
            method: "DELETE"
        })
        console.log(`silindi ${item}`);
        
    })
}
getAllimg()