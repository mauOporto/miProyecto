const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('templateFooter')
const fragment = document.createDocumentFragment();

document.addEventListener('click', (e) => {
    if(e.target.matches('.card .btn-outline-primary')){
        // console.log('Ejecutar al carro');
        agregarCarrito(e)

    }
    if(e.target.matches('#carrito .list-group-item .btn-success')){
    
        btnAumentar(e);
    }
    if(e.target.matches('#carrito .list-group-item .btn-danger')){
        btnDisminuir(e);
    }
    
})


let carritoObjeto =[];
 
const agregarCarrito = (e) => {
 
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    };
    console.log(producto);
    
 
    //Buscamos el indice
    const index = carritoObjeto.findIndex((item) => item.id === producto.id)
   
    //Si no existe empujamos el nuevo elemento que se encuentra en producto
    if(index === -1){
        carritoObjeto.push(producto);
    }else{
        //En caso contrario, o sea que si este el producto, entonces lo aumentamos
        carritoObjeto[index].cantidad++;
        // carritoObjeto[index].precio = 
        //     carritoObjeto[index].cantidad * producto.precio;
    }

 
 
 
 
    pintarCarrito();
 
   
}
 
const pintarCarrito = () => {
 
    carrito.textContent = ''
 
    Object.values(carritoObjeto).forEach((item) =>{
        const clone = template.content.cloneNode(true)
        clone.querySelector('.text-white .lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('div .lead span'). textContent = 
        item.precio * item.cantidad;
        clone.querySelector('.btn-success').dataset.id = item.id;
        clone.querySelector('.btn-danger').dataset.id = item.id;
        fragment.appendChild(clone)
    })
   
    carrito.appendChild(fragment)

    pintarFooter();
}

const pintarFooter = () => {
    footer.textContent = '';

    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.precio * current.cantidad, 0
    );
    // console.log(total);

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('p span').textContent = total;

    footer.appendChild(clone);
}

const btnAumentar = (e) => {
    carritoObjeto = carritoObjeto.map((item) => {
        if(item.id === e.target.dataset.id){
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    carritoObjeto = carritoObjeto.filter((item) => {
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0) {
                item.cantidad--;
                if(item.cantidad === 0)return;
                return item;
            }
        } else {
            return item;
        }
    })
    pintarCarrito();
}
 
// boton.forEach((btn) => btn.addEventListener('click', agregarCarrito))