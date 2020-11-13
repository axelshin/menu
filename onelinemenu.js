document.addEventListener('DOMContentLoaded', function(){
    
let menuWrapper = document.querySelector('.menu-wrapper'),
    menu = menuWrapper.querySelector('ul.menu'),
    menuWidth = menu.offsetWidth,
    menuItems = menu.children,
    menuItemsWidth = 0,
    moreLi = document.createElement('li'),
    moreA = document.createElement('a'),
    moreUl = document.createElement('ul'),
    menuLinks,
    menuDirectionWidth = window.innerWidth,
    menuCurrentDirection;

moreA.textContent = '...';
moreLi.classList.add('more');
moreLi.appendChild(moreA);
moreLi.appendChild(moreUl);
menu.appendChild(moreLi);

for( let i = 0; i < menuItems.length; i++ ){
    let item = menuItems[i];
    menuItemsWidth += item.offsetWidth;
}

for( let i = menuItems.length - 1; i > -1; i-- ){
    let item = menuItems[i];
    
    if( item.classList.contains('more') ){
        continue        
    }
    else if( menuItemsWidth > menuWidth ){        
        menuItemsWidth -= item.offsetWidth
        item.classList.remove('lvl1');
        moreUl.appendChild(item);        
    }
    else{        
        break
    }    
}


menuLinks = menu.querySelectorAll('li');
menuLinks.forEach(function(link){
    let iit;
    link.addEventListener('mouseenter', function(event){

        clearTimeout(iit);
        let $this = this,
            ul = $this.children[1] ? $this.children[1] : false;
        
        if (!ul) return        
        if( $this.classList.contains('lvl1') ){
            menuCurrentDirection = false;
        }
        $this.classList.add('active');
        ul.classList.add('active');

        let ulLeft,
            ulRight;        

        if( menuCurrentDirection == 'left' ){
            ul.classList.add('left');
            ulRight = ul.getBoundingClientRect().right;
            if( ulRight > menuDirectionWidth ){                
                ul.classList.remove('left');
                ul.classList.add('right');
                menuCurrentDirection = 'right';
            }
        }
        else if ( menuCurrentDirection == 'right' ){
            ul.classList.add('right');
            ulLeft = ul.getBoundingClientRect().left
            if( ulLeft < 0 ){                
                ul.classList.remove('right');
                ul.classList.add('left');
                menuCurrentDirection = 'left'
            }
        }
        else {
            ul.classList.remove('right');
            ul.classList.add('left');
            ulLeft = ul.getBoundingClientRect().left;
            ulRight = ul.getBoundingClientRect().right;

            if( ulRight > menuDirectionWidth ){
                ul.classList.remove('left');
                ul.classList.add('right');
                menuCurrentDirection = 'right'
            }
            else if ( ulLeft < 0 ){
                ul.classList.remove('right');
                ul.classList.add('left');
                menuCurrentDirection = 'left'
            }
        }
    });

    link.addEventListener('mouseleave', function(event){
        
        let $this = this,
        ul = $this.querySelector('ul');
        if (!ul) return
        iit = setTimeout(function(){
            ul.classList.remove('active');
            $this.classList.remove('active');
        }, 300)
        
    });
});



});