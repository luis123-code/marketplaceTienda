<template>
    <div>
        <!-- Sección Crear Usuario -->
        <section style="max-width: 402px;" v-if="nameDialogDinamic === 'Usuarios'">
            <article style="display: flex; flex-direction: column; padding-left: 26px;">
                <h2 class="recovery-tittle" style="margin: 14px 0px;">Crear usuario</h2>
                <label class="login-section__label" for="nombre" style="margin: 10px 0;">Nombre</label>
                    <input v-model="objetoDinamico.nombre" :placeholder="objetoDinamico.nombre" class="general-input login-section__recovery" style="margin-bottom:2px" type="text">
                    
                    <label class="login-section__label" for="apellido" style="margin: 10px 0;">Apellido</label>
                    <input v-model="objetoDinamico.apellido" :placeholder="objetoDinamico.apellido" class="general-input login-section__recovery" style="margin-bottom:2px" type="text">
                    
                    <label class="login-section__label" for="correo" style="margin: 10px 0;">Correo</label>
                    <input v-model="objetoDinamico.correo" :placeholder="objetoDinamico.correo" class="general-input login-section__recovery" style="margin-bottom:2px" type="text">
                    
                    <label class="login-section__label" for="constrasenia" style="margin: 10px 0;">Contraseña</label>
                    <input v-model="objetoDinamico.constrasenia" :placeholder="objetoDinamico.constrasenia" class="general-input login-section__recovery" style="margin-bottom:2px" type="text">
                    
                    <label class="login-section__label" for="telefono" style="margin: 10px 0;">Teléfono</label>
                    <input v-model="objetoDinamico.telefono" :placeholder="objetoDinamico.telefono" class="general-input login-section__recovery" style="margin-bottom:2px" type="text">
                    
                    <label class="login-section__label" for="ciudad" style="margin: 10px 0;">Ciudad</label>
                    <input v-model="objetoDinamico.ciudad" :placeholder="objetoDinamico.ciudad" class="general-input login-section__recovery" style="margin-bottom:2px" type="text">
            </article>
            <div class="product-detail-buttom">
                <button
                    data-product="n3237"
                    style="margin-top: 5px; background-color: #acd9b2; min-width: 250px;"
                    id="js-detail-btn"
                    class="general-button green--btn"
                    @click.stop="enviar('usuario')"
                >
                    <img class="normal--size" src="../static/icons/users.svg" alt="image of shopping car">
                    <span id="js-detail-btn-text" class="product-detail-buttom__text">{{nameAccion }} usuario</span>
                </button>
            </div>
        </section>







        <!-- Sección Crear Producto -->
        <section v-else style="display: flex; max-width: 635px; gap: 28px;">
            <article style="width: 308px; background-color: #fff; padding: 20px 16px 0px; border-radius: 10px;">
                <div
                    id="js-detail-img"
                    class="new-img product-detail-img"
                    style="height: 250px; width: 100%;"
                    :style="{ 'background-image': `url(${objetoDinamico.imgs ? objetoDinamico.imgs[0].img : ''})` }"
                >

                    <div class="points-wrapper">
                        <div class="point selected-point"></div>
                        <div class="point"></div>
                        <div class="point"></div>
                    </div>
                </div>
                <div class="product-detail-info">
                    <span id="js-detail-price" class="price-product">
                        Precio ..... : <br> ${{ objetoDinamico.price }}
                    </span>
                    <h3 id="js-detail-tittle" class="recovery-text" style="margin: 10px 4px;">
                        Nombre ..... : <br> {{ objetoDinamico.name }}
                    </h3>
                    <p id="js-detail-descrip" class="recovery-text" style="margin: 10px 4px;">
                        Description .: <br> {{ objetoDinamico.description }} .
                    </p>
                </div>
            </article>
            <article style="width: 400px;">
                <h2 class="recovery-tittle" style="margin: 14px 0px;">{{nameAccion}} Productos</h2>
                <label class="login-section__label" for="user-txt" style="margin: 10px 0;"   >Insertar imagen</label>
                <input class="general-input login-section__recovery" type="text"   v-model="objetoDinamico.imgs[0].img">
                <label class="login-section__label" for="login-txt" style="margin: 10px 0;">{{nameAccion}} precio</label>
                <input v-model="objetoDinamico.price"   class="general-input login-section__recovery" type="text" :placeholder="objetoDinamico.price"  >
                <label class="login-section__label" for="login-txt" style="margin: 10px 0;">{{nameAccion}} nombre</label>
                <input v-model="objetoDinamico.name"   class="general-input login-section__recovery" :placeholder="objetoDinamico.name" type="text">
                <label class="login-section__label" for="login-txt" style="margin: 10px 0;">{{nameAccion}} typo</label>
                <select v-model="objetoDinamico.type" class="general-input login-section__recovery">
                    <option disabled value="">Seleccione una opción</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furnitures">Furnitures</option>
                    <option value="Toys">Toys</option>
                    <option value="Others">Others</option>
                </select>
                <label class="login-section__label" for="login-txt" style="margin: 10px 0;">{{nameAccion}} descripcion</label>
                <input v-model="objetoDinamico.description"   class="general-input login-section__recovery "   :placeholder="objetoDinamico.description" type="text">
                <div class="product-detail-buttom">
                    <button
                        @click.stop="enviar('producto')"
                        data-product="n3237"
                        style="background-color: rgb(113, 114, 113); min-width: 250px;"
                        id="js-detail-btn"
                        class="general-button green--btn"
                    >
                        <img class="normal--size" src="../static/icons/shopping-icon.svg" alt="image of shopping car">
                        <span id="js-detail-btn-text" class="product-detail-buttom__text">{{nameAccion}} producto</span>
                    </button>
                </div>
            </article>
        </section>
    </div>
</template>

<script>


export default {
    name: "diaologDianamic",
    layout: 'redirigir',
    props: {
        nameDialogDinamic : {
            type : String ,
            default : () => "Usuarios" ,
        },

        datoActuaizar : {
            type : Object ,
            default : () => ({})
        },

        nameAccion : {
            type : String 
        }
    },
    mounted(){
       
        switch (this.nameAccion) {
            case "Actualizar":
                this.typeEnvioAccion = "Actualizar"
                if(this.validarActualizarProps()){
                        this.validacion = true
                        this.objetoDinamico = {...this.datoActuaizar }
                        this.idPrincipal = this.objetoDinamico.id
                }else{
                        this.limpiarDato()
                        this.validacion = false
                }
                break;
            case "Crear" :
                this.typeEnvioAccion = "Crear" 
                    break;
                default:
                    break;
            }
    },
    data() {
        return {
            objetoDinamico : {
                name: "",
                price:"" ,
                type: "",
                description: "",
                imgs: [{ img: "https://res.cloudinary.com/ddedghgb6/image/upload/v1747279704/lmozqnwexbyreelvaged.jpg",size: "normal"}],
                nombre: "",
                apellido: "",
                correo: "",
                telefono: "",
                ciudad: "",
                constrasenia: "",
            },
            idPrincipal : "" ,
            typeEnvioAccion  : "" ,
            arrays: ["Usuarios", "Productos"],
            validacion : "" ,
            informacion: {
                id: 3,
                name: "product_3",
                price: 52,
                type: "toys",
                description: "Description for product 3",
                imgs: [
                    {
                        img: "https://res.cloudinary.com/ddedghgb6/image/upload/v1747279704/lmozqnwexbyreelvaged.jpg",
                        size: "normal"
                    }
                ]
            }
        };
    },
    methods: {
        enviar(accion){
            console.log("accion emviar"  , accion )
            switch (this.typeEnvioAccion) {
                case "Actualizar":
                    this.validacionTypo(accion , "actualizacion" )
                    break;
                case "Crear":
                    this.validacionTypo(accion , "envio" )
                    break;
                default:
                    break;
            }
        },

    async  validacionTypo(accion , funcion){
            let respuesta = null; 
            let validacion = (boleano , typo) => {
                const { name, price, description, imgs , type ,  nombre, apellido, correo, telefono, ciudad, constrasenia  } = this.objetoDinamico;
                if(boleano){
                    switch (typo) {
                        case "usuario" :
                            this.$store.commit("agregandoObjct" , {
                                    nombre,
                                    apellido,
                                    correo,
                                    telefono,
                                    ciudad,
                                    constrasenia,
                                    id : this.idPrincipal
                                })

                            break;
                        case "producto" :
                            this.$store.commit("agregandoObjct" , {
                                name,
                                price,
                                description,
                                imgs,
                                type ,
                                id : this.idPrincipal
                            })
                            break;
                        default:
                            break;
                    }
                    this.$emit("accionTabla", boleano);
                }else{
                    this.$emit("accionTabla", boleano);
                }
            }

            switch(accion){
                case "usuario" :
                    respuesta = await this[`${funcion}Usuario`]()
                    validacion(respuesta, "usuario");
                break ;
                case "producto" :
                    respuesta = await this[`${funcion}Productos`]()
                    validacion(respuesta, "producto");
                break ;
                default : 
                break;
            }
        },

        async envioProductos() {
            const resultado = this.validarProducto();
            if (resultado.focus) {
                try {
                    await this.$store.dispatch('obtniendoProductos', {
                        cuerpo: resultado.obj,
                        methodo: 'POST'
                    });
                    let respuesta = this.$store.state.respuestaProductos;
                    if (respuesta) {
                        alert("✅ Se creó");
                        return true;
                    } else {
                        alert("❌ No se creó");
                        return false;
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else {
                console.log("❌ No se pudo enviar el producto. Validación fallida.");
                return false;
            }
        },

        async envioUsuario() {
            const resultado = this.validarUsuario();
            if (resultado.focus) {
                try {
                    await this.$store.dispatch('registro', resultado.obj);
                    let respuesta = this.$store.state.respuestaRegistro;
                    if (respuesta) {
                        alert("✅ Se creó");
                        return true;
                    } else {
                        alert("❌ No se creó");
                        return false;
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else {
                console.log("❌ No se pudo enviar el usuario. Validación fallida.");
                return false;
            }
        },
        
        async actualizacionProductos() {
            const resultado = this.validarProducto();
            if (resultado.focus) {
                try {
                    await this.$store.dispatch('obtniendoProductos', {
                        cuerpo: {
                            ...resultado.obj,
                            id: this.idPrincipal
                        },
                        methodo: 'PATCH'
                    });
                    let respuesta = this.$store.state.respuestaProductos;
                    if (respuesta) {
                        alert("✅ Se actualizó");
                        return true;
                    } else {
                        alert("❌ No se actualizó");
                        return false;
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else {
                console.log("❌ No se pudo actualizar el producto. Validación fallida.");
                return false;
            }
        },
        
        async actualizacionUsuario() {
            const resultado = this.validarUsuario();
            if (resultado.focus) {
                try {
                    await this.$store.dispatch('actualizarUsuarioTotal', {
                        ...resultado.obj,
                        id: this.idPrincipal
                    });
                    let respuesta = this.$store.state.respuestaActualizacion;
                    if (respuesta) {
                        alert("✅ Se actualizó");
                        return true;
                    } else {
                        alert("❌ No se actualizó");
                        return false;
                    }
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else {
                console.log("❌ No se pudo actualizar el usuario. Validación fallida.");
                return false;
            }
        },

        navegando(valores, index) {
            this.isIndex = index;
            console.log("valoresss", valores);
        },
        validarActualizarProps(){
            return this.datoActuaizar && typeof this.datoActuaizar === 'object' && !Array.isArray(this.datoActuaizar)
        },




        validarProducto() {
            const { name, price, description, imgs , type} = this.objetoDinamico;
        
                if (!name || !price || !description || !imgs.length || !imgs[0].img || !type) {
                    alert("Por favor, llena todos los campos del producto.");
                    return {
                        focus: false
                    };
                }
        
                return {
                    focus: true,
                    obj: {
                        name,
                        price : Number(price),
                        description,
                        type,
                        imgs
                    }
                };
            },
        
        validarUsuario() {
                const { nombre, apellido, correo, telefono, ciudad, constrasenia } = this.objetoDinamico;
                console.log(this.objetoDinamico)
        
                if (!nombre || !apellido || !correo || !telefono || !ciudad || !constrasenia) {
                    alert("Por favor, llena todos los campos del usuario.");
                    return {
                        focus: false
                    };
                }
        
                return {
                    focus: true,
                    obj: {
                        name : nombre,
                        apellido,
                        email : correo,
                        phone : telefono,
                        city  : ciudad,
                        password : constrasenia
                    }
                };
            },
        limpiarDato(){
            this.objetoDinamico = {
                name: "",
                price:"" ,
                type: "",
                description: "",
                imgs: [{ img: "https://res.cloudinary.com/ddedghgb6/image/upload/v1747279704/lmozqnwexbyreelvaged.jpg",size: "normal"}],
                nombre: "",
                apellido: "",
                correo: "",
                telefono: "",
                ciudad: "",
                constrasenia: "",
            }
        }   
    },    
};
</script>

<style scoped>
input {
    background-color: #fff;
}
</style>
