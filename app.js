(function(){
    const sizeButtons = document.querySelectorAll('.controls-size .control-button');
    for(const b of sizeButtons) {        
        b.onclick = function() {
            for(const s of sizeButtons) {
                s.classList.remove('selected');              
            }
            this.classList.add('selected');
            switchSize(b.dataset.size);
        }
    }

    document.getElementById('btn-back').onclick = prevSlide;
    document.getElementById('btn-forw').onclick = nextSlide;
    document.getElementById('btn-adicionar').onclick = adicionar;

    let selPizza;
    let sacola = [];

    const pizzas = [
        {
            id: 101,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44092.png",
            name: "Pizza de marguerita"
        },
        {
            id: 102,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44077.png",
            name: "Pizza Mexicana"
        },
        {
            id: 103,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44092.png",
            name: "Romeu e Julieta"
        },
        {
            id: 104,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44077.png",
            name: "Espanhola"
        },
        {
            id: 105,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44092.png",
            name: "Bahiana"
        },
        {
            id: 106,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44092.png",
            name: "À moda da casa"
        },
        {
            id: 107,
            imgsrc: "https://pngimg.com/uploads/pizza/pizza_PNG44092.png",
            name: "Pizza Doce"
        }
    ]
    
    function loadPizzas(pizzas) {        
        let html = '';
        if(pizzas.length >= 5) {
            pizzasRender = pizzas;
            selPizza = pizzas[2];            
        } else {

        }

        pizzasRender.forEach((item, i) => {
            const classPizza = (i == 0) ? 'prev-p' : (i == 1) ? 'prev' : (i == 2) ? 'active' : (i == 3) ? 'next' : 'next-n';
            html += `<div class="pizza ${classPizza}" data-id="${item.id}">
                        <div class="content">
                            <img src="${item.imgsrc}" alt="Não encontrada">
                        </div>
                    </div>`;
        });

        document.getElementById('pizza-title').querySelector('h1').textContent = selPizza.name;

        document.querySelector('.pizza-carrousel').innerHTML = html;
    }    

    
    function adicionar() {        
        const active = document.querySelector('.pizza.active:not(.move)');
        const clone = active.cloneNode();
        clone.innerHTML = active.innerHTML;
        sacola.push(selPizza);

        clone.ontransitionend = () => {
            clone.style.opacity = 0;

            setTimeout(() => {            
                clone.remove();                    
                document.querySelector('.indicator').textContent = sacola.length;                    
            }, 200)                         
        }            
        document.querySelector('.pizza-carrousel').appendChild(clone);            
        setTimeout(() => {
            clone.classList.add('move');
        }, 10)        
    }

    function nextSlide() {        

        const pizzasel = document.querySelectorAll('.pizza');
        
        const el = document.querySelector('.pizza.active')

        const list = Array.prototype.slice.call(pizzasel);           
        const activei = list.indexOf(el);        
        
        const prev = pizzasel[activei - 1];
        const prevP = pizzasel[activei - 2];

        const next = pizzasel[activei + 1];
        next.classList.remove('next')
        next.classList.add('next-n')

        const last = pizzasel[pizzasel.length -1];
        last.classList.remove('next-n')
        last.classList.add('prev-p')

        document.querySelector('.pizza-carrousel').insertBefore(last, pizzasel[0]);

        prev.className = 'pizza active';
        
        const id = prev.dataset.id        
        selPizza = pizzas.filter((i) => i.id == id)[0];        
        switchTitle(selPizza.name)

        prevP.classList.remove('prev-p');
        prevP.classList.add('prev');

        el.classList.remove('active')
        el.classList.add('next')
    }

    function prevSlide() {        
        const size = document.querySelector('.controls-size .control-button.selected').dataset.size;

        const pizzasel = document.querySelectorAll('.pizza');
        
        const el = document.querySelector('.pizza.active')

        const list = Array.prototype.slice.call(pizzasel);           
        const activei = list.indexOf(el);        
        
        const next = pizzasel[activei + 1];
        const nextN = pizzasel[activei + 2];

        const prev = pizzasel[activei - 1];

        prev.classList.remove('prev');
        prev.classList.add('prev-p');

        const first = pizzasel[0];
        first.classList.remove('prev-p')
        first.classList.add('next-n')

        document.querySelector('.pizza-carrousel').insertBefore(first, pizzasel[pizzasel.length]);

        next.className = `pizza active ${size}`;

        const id = next.dataset.id        
        selPizza = pizzas.filter((i) => i.id == id)[0];        
        switchTitle(selPizza.name)

        nextN.classList.remove('next-n');
        nextN.classList.add('next');

        el.classList.remove('active')
        el.classList.add('prev')
    }    
    
    function switchTitle(title) {        
        const el = document.getElementById('pizza-title');

        const oldh = el.querySelector('h1:not(.hide)');
        oldh.ontransitionend = () => {
            if(oldh.classList.contains('hide')){
                oldh.remove();
            }
        }
        const newh = document.createElement('h1');
        newh.textContent     = title;
        newh.classList.add('hide');
        el.appendChild(newh);
        
        setTimeout(() => {
            oldh.classList.add('hide');
            newh.classList.remove('hide');
        }, 100)
    }

    function switchSize(size) {
        document.querySelector('.pizza.active').className = `pizza active ${size}`;
    }

    loadPizzas(pizzas);
})()