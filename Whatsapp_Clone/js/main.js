window.onload = () =>{
    let nav = document.querySelector('#Nav');

    // Ditect Page Postion
    let go_to_Home = document.querySelector('.HomeBtn_Wrapper');
    go_to_Home.addEventListener('click', ()=>{
        localStorage.setItem('which_page_active', 'home')
        let pageActive = 'home'
        PageActivate(pageActive);
    })

    // Activate Status Page
    let go_to_Status = document.querySelector('.StatusBtn_Wrapper');
    go_to_Status.addEventListener('click', ()=>{
        
        localStorage.setItem('which_page_active', 'status')
        let pageActive = 'status'
        PageActivate(pageActive);

    })

    // Activate Call Page
    let go_to_Call = document.querySelector('.CallBtn_Wrapper');
    go_to_Call.addEventListener('click', ()=>{
        
        localStorage.setItem('which_page_active', 'call')
        let pageActive = 'call'
        PageActivate(pageActive);

    })


    // USEING AJAX IMPORT HTML PAGE AND EMBADE INSIDE SECTION
    const Ajx_Req = (req) =>{
        fetch(`${req}`)
        .then(response =>{
            return response.text();
        })
        .then(data => {
            // console.warn(data)
            var parser = new DOMParser();
            let dom = parser.parseFromString(data, "text/html");
            let links = dom.querySelectorAll('link');
            let scripts = dom.querySelectorAll('script');
            let section = document.querySelector('section');
            section.innerHTML = ``;

            for (let linkItem = 0; linkItem < links.length; linkItem++){
                section.appendChild(links[linkItem]);
            }

            for (let scriptItem = 0; scriptItem < (scripts.length -1); scriptItem++){
                section.appendChild(scripts[scriptItem]);
            }
            section.appendChild(dom.body.firstElementChild);

            Sction_Status();
        })
    }

    // INITIALIZE AJAX REQUEST
    const PageActivate = (pageActive) =>{
        if (pageActive == 'home' || pageActive == null){
            Ajx_Req("../html/home.html");

            nav.children[1].children[0].classList.add('Nav_btn_active');
            nav.children[2].children[0].classList.remove('Nav_btn_active');
            nav.children[3].children[0].classList.remove('Nav_btn_active');
            document.querySelector('#Chat_header').classList.add('hide_element');
        }
        else if (pageActive == 'status'){
            Ajx_Req("../html/status.html");

            nav.children[1].children[0].classList.remove('Nav_btn_active');
            nav.children[2].children[0].classList.add('Nav_btn_active');
            nav.children[3].children[0].classList.remove('Nav_btn_active');
        }
        else if (pageActive == 'call'){
            Ajx_Req("../html/call.html");

            nav.children[1].children[0].classList.remove('Nav_btn_active');
            nav.children[2].children[0].classList.remove('Nav_btn_active');
            nav.children[3].children[0].classList.add('Nav_btn_active');
        }
        else if (pageActive == 'chat'){
            Ajx_Req("../html/chat.html");

            document.querySelector('#Normal_header').classList.add('hide_element');
            document.querySelector('nav').classList.add('hide_element');
            document.querySelector('section').style.top = `-50px`;
            document.querySelector('section').style.height = `calc(100vh - 100px)`;
            document.querySelector('#Chat_header').classList.remove('hide_element');
        }
    }

    let pageActive = localStorage.getItem('which_page_active')
    PageActivate(pageActive);

    


    const Sction_Status = () =>{
        let sectiom_contents = document.querySelectorAll('.HCW');
        if (sectiom_contents[0] != undefined){
            sectiom_contents.forEach(items => {
                items.addEventListener('click', ()=>{
            
                    localStorage.setItem('which_page_active', 'chat')
                    let pageActive = 'chat'
                    PageActivate(pageActive);
            
                })
            })
        }
    }

    let Arrow_Back = document.querySelector('#Arrow_Back')
    if (Arrow_Back != null){
        Arrow_Back.addEventListener('click', () =>{
            localStorage.setItem('which_page_active', 'home')
            let pageActive = 'home'
            PageActivate(pageActive);
            document.querySelector('#Normal_header').style.display = 'grid';
            document.querySelector('nav').classList.remove('hide_element');
            document.querySelector('section').style.top = `0px`;
            document.querySelector('section').style.height = `calc(100vh - 150px)`;
        })
    }

}


// DETECT SCROLL POSTION
let section = document.querySelector('section');
let prev_Scroll_pos = window.pageYOffset;
section.addEventListener('scroll', ()=>{
    let next_Scroll_pos = section.scrollTop;
    if (prev_Scroll_pos > next_Scroll_pos){
        document.querySelector('#Nav').style.top = '50px';
        document.querySelector('#Normal_header').style.top = '0px';
        document.querySelector('section').style.top = '0px';
        document.querySelector('section').style.height = `calc(100vh - 100px)`;
    }
    else{
        document.querySelector('#Nav').style.top = '0px';
        document.querySelector('#Normal_header').style.top = '-50px';
        document.querySelector('section').style.top = '-50px';
    }
    prev_Scroll_pos = next_Scroll_pos;
})
