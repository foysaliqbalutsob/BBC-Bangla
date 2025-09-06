const forBookMarkArr = [];

// ================== Delete ফাংশন ==================
function deleteBookmark(bookmarkId) {
    // Filter করে ওই id বাদ দাও
    const updatedArr = forBookMarkArr.filter(item => item.id !== bookmarkId);

    // গ্লোবাল অ্যারে আপডেট করো
    forBookMarkArr.length = 0;
    forBookMarkArr.push(...updatedArr);

    // আবার render করো
    renderBookmarks();
}


function renderBookmarks() {
    const bookmarkContainer = document.getElementById('bookmark-container');
    bookmarkContainer.innerHTML = '';

    forBookMarkArr.forEach(element => {
        bookmarkContainer.innerHTML += `
            <div class="border my-2 p-1">
                <h1>${element.title}</h1>
                <button onclick="deleteBookmark('${element.id}')" class="btn">Delete</button>
            </div>
        `;
    });
}


const LoadCategoryForNavBar = () => {
    const url = "https://news-api-fs.vercel.app/api/categories";
    fetch(url)
        .then((category) => category.json())
        .then((navList) => {
            displayNavList(navList.categories);
        });
};

const displayNavList = (categoryArr) => {
    const navBarItems = document.getElementById('nav-bar-items');
    navBarItems.innerHTML = '';

    categoryArr.forEach(element => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<li id='${element.id}' class="hover:border-b-4 border-red-600 hover:border-red-600 cursor-pointer">${element.title}</li>`;
        navBarItems.append(navItem);
    });

    navBarItems.addEventListener('click', function (e) {
        const allLi = navBarItems.querySelectorAll('li');
        allLi.forEach(li => li.classList.remove("border-b-4"));

        if (e.target.localName === 'li') {
            e.target.classList.add('border-b-4');
            loadNewsByNav(e.target.id);
        }
    });
};


const loadNewsByNav = (categoryId) => {
    const url = `https://news-api-fs.vercel.app/api/categories/${categoryId}`;
    fetch(url)
        .then((res) => res.json())
        .then((news) => {
            displayNews(news.articles);
        });
};

const displayNews = (newsArr) => {
    const newsMainContainer = document.getElementById('news-main-container');
    newsMainContainer.innerHTML = '';

    newsArr.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div id='${news.id}' class="border border-gray-300 rounded-sm">
                <div>
                    <img src="${news.image.srcset[5].url}">
                </div>
                <div class="p-2">
                    <h1>${news.title}</h1>
                    <h1 class="text-sm">${news.time}</h1>
                    <button class="btn">Bookmark</button>
                </div>
            </div>`;
        newsMainContainer.append(newsDiv);
    });

    newsMainContainer.addEventListener('click', function (e) {
        if (e.target.innerText === 'Bookmark') {
            const id = e.target.parentNode.parentNode.id;
            const title = e.target.parentNode.children[0].innerText;

            // Duplicate check
            const exists = forBookMarkArr.find(item => item.id === id);
            if (!exists) {
                forBookMarkArr.push({ title, id });
                renderBookmarks();
            }
        }
    });
};


LoadCategoryForNavBar();
loadNewsByNav("main");
