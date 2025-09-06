
// firstly catch the category for the nav bar
const LoadCategoryForNavBar = ()=>{
    const url = "https://news-api-fs.vercel.app/api/categories";
    fetch(url).then((category)=> category.json())
    .then((navList) =>{
        console.log(navList.categories);
        displayNavList(navList.categories);
    })

}

const forBookMarkArr = []


// const bookmarkContainer = document.getElementById('bookmark-container')
// console.log(bookmarkContainer);
//  displayNews.addEventListener('click',
//     function(e){
//         console.log('clicked')

//     }
// )
const  displayNavList = (categoryArr) =>{

    const navBarItems = document.getElementById('nav-bar-items')
    navBarItems.innerHTML ='';


    console.log(categoryArr)
    categoryArr.forEach(element => {
        // console.log(element.title)
        // console.log(element.id);
        
        
        const navItem = document.createElement('li')
        navItem.innerHTML = `<li id='${element.id}' onclick= 'loadNewsByNav(${element.id})' class="hover:border-b-4 border-red-600 hover:border-red-600 cursor-pointer">${element.title} </li>`;
        navBarItems.append(navItem);
        
    });

    navBarItems.addEventListener('click',
        function(e){
            
            e.target.classList.remove('border-b-4')
            const allLi = navBarItems.querySelectorAll('li');
            allLi.forEach(li => {
                li.classList.remove("border-b-4")
                
                
            });


            if(e.target.localName === 'li'){
                // console.log(e.target)
                
                e.target.classList.add('border-b-4')
                loadNewsByNav(e.target.id)

            }
            
        }
    )
}

    
    // load news when i click nav Icon
    
const loadNewsByNav = (categoryId) =>{
    console.log(categoryId)

    const url =`https://news-api-fs.vercel.app/api/categories/${categoryId}`;
    fetch(url).then((res) =>res.json())
    .then((news) => {
        // console.log(news.articles);
        displayNews(news.articles)
        
    });


    const displayNews = (newsArr)=>{
        

        const newsMainContainer = document.getElementById('news-main-container');
        newsMainContainer.innerHTML ='';
        console.log(newsMainContainer)
        console.log(newsArr);
        newsArr.forEach(news => {
            console.log(news)
            const newsDiv = document.createElement('div')
            newsDiv.innerHTML = 
            `<div id='${news.id}' class = "border border-gray-300 rounded-sm  ">
                <div>
                    <img src = " ${news.image.srcset[5].url}">
                </div>
                
                <div class = "p-2">
                    <h1>${news.title}</h1>
                    <h1 class="text-sm">${news.time}</h1>
                    <button class ="btn" >Bookmark</button>
                   
                </div>
            </div>`;
            newsMainContainer.append(newsDiv)
            
        });

        const bookmarkContainer = document.getElementById('bookmark-container')
        // console.log(bookmarkContainer);
        newsMainContainer.addEventListener('click',
        function(e){
        // console.log(e.target.innerText)
        if(e.target.innerText === 'Bookmark'){

            const id = (e.target.parentNode.parentNode.id);
            


            const title = (e.target.parentNode.children[0].innerText);
            forBookMarkArr.push ({
                title : title,
                id : id
            }
            )
            console.log(forBookMarkArr)
            console.log(bookmarkContainer);
            bookmarkContainer.innerHTML = '';
            forBookMarkArr.forEach(element => {
                console.log(element.title);
                
             bookmarkContainer.innerHTML += 
             `
             <div class="border my-2 p-1">
             <h1 >${element.title} </h1>
              <button onclick='deleteBookmark(${id})' class ="btn" >Delete</button>
             </div>
             `;

                
            });
            


        }
        // const deleteBookmark = (bookmarkId) =>{
        //         console.log(bookmarkId)

        //     }

    }
)

    }

        
        

}
function deleteBookmark(bookmarkId) {
    // Filter করে ওই id বাদ দাও
    const updatedArr = forBookMarkArr.filter(item => item.id !== bookmarkId);

    // গ্লোবাল অ্যারে আপডেট করো
    forBookMarkArr.length = 0;
    forBookMarkArr.push(...updatedArr);

    // আবার render করো
    renderBookmarks();
}

    


LoadCategoryForNavBar();
loadNewsByNav("main");