const formulario = Vue.createApp({template:`
<div>
    <div>
        <div class="row mb-3">
            <h1>Registro de correos</h1>
        </div>
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Contraseña</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
        </div>
        <div class="btn-group">
            <button v-if="editar == false" type="buttom" class="btn btn-danger" @click="cargarDatos">Registrar</button>
            <button v-if="editar == true" type="buttom" class="btn btn-warning" @click="modificarDatos">Modificar</button>
            <button type="buttom" class="btn btn-dark" @click="limpiarDatos">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
            </button>
        </div>
    </div>
</div>
<div class="mt-5">
    <table id="table_id" class="display table table-striped">
        <thead>
            <tr>
                <th class="col-2">#</th>
                <th class="col-1">Email</th>
                <th class="col-7 text-center">
                    <button v-if="codificado == false" type="button" class="btn btn-white" @click="codificarPassword">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                    <button v-if="codificado == true" type="button" class="btn btn-white" @click="codificarPassword">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    </button>
                </th>
                <th class="col-2">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dato in datos">
                <th scope="row">{{dato.id}}</th>
                <td>{{dato.email}}</td>
                <td v-if="codificado == false" class="text-center"><kbd class="bg-transparent text-secondary"><small>{{dato.password}}</small></kbd></td>
                <td v-if="codificado == true" class="text-secondary text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-danger" @click="editarDatos(dato.id, dato.email, dato.password)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                        </button>
                        <button type="button" class="btn btn-dark" @click="borrarDatos(dato.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
`,
    data(){
        return  {
            toquen: '{{ csrf_token }}',
            form: {},
            datos: null,
            id: null,
            email: null,
            password: null,
            id: null,
            indice: 0,
            editar: false,
            codificado: true,
            id_editar: null,
            prueba: 123
        }
    },
    methods: {
        datatables: function(){
            axios
            .get('/actualizar_datos/')
            .then(response => (
                this.datos = response.data
            ));
            $(document).ready( function(){
                $('#table_id').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    },
                    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
                });
            });
        },
        cargarDatos: function(){
            this.actualizarDatos();
            this.editar = false;
            let token = Cookies.get()
            let toquen = JSON.stringify(token.csrftoken)
            toquen = toquen.replace(/"/g,'');
            //console.log('Token:', toquen);
            let formData = new FormData()
            formData.append('email', this.email)
            formData.append('password', this.password)
            axios
            .post('/cargar_datos/', formData, {
                headers: {   
                    'Content-Type': 'multipart/form-data',           
                    'X-CSRFToken': toquen,
                }
            })
            .then(function (response) {
                form = {
                    email: this.email,
                    password: this.password
                };
                //console.log('Formulario OK!', form);
            }),
            this.email = '';
            this.password = '';
            this.actualizarDatos();
        },
        borrarDatos: function(indice){
            this.actualizarDatos();
            let id_borrar = indice
            //console.log(id_borrar);
            let token = Cookies.get()
            let toquen = JSON.stringify(token.csrftoken)
            toquen = toquen.replace(/"/g,'');
            //console.log('Token:', toquen);
            let formData = new FormData()
            formData.append('id', id_borrar)
            axios
            .post('/borrar_datos/', formData, {
                headers: {   
                    'Content-Type': 'multipart/form-data',           
                    'X-CSRFToken': toquen,
                }
            })
            .then(function (response) {
                let borrar = {
                    id: this.id_borrar,
                };
                //console.log('ID borrar OK!', this.id_borrar);
            }),
            this.actualizarDatos();
        },
        editarDatos: function(indice, email, password){
            this.actualizarDatos();
            if (this.editar == false){
                this.editar = true;
                this.id_editar = indice;
                this.email = email;
                this.password = password;
            } else {
                this.editar = false;
                this.id_editar = null;
                this.email = '';
                this.password = '';
            };
            //console.log(this.id_editar);
            //console.log(this.email);
            //console.log(this.password)
        },
        modificarDatos: function(){
            this.actualizarDatos();
            let token = Cookies.get()
            let toquen = JSON.stringify(token.csrftoken)
            toquen = toquen.replace(/"/g,'');
            //console.log('Token:', toquen);
            //console.log(this.id_editar);
            //console.log(this.email);
            //console.log(this.password);
            let formData = new FormData()
            formData.append('id', this.id_editar)
            formData.append('email', this.email)
            formData.append('password', this.password)
            axios
            .post('/editar_datos/', formData, {
                headers: {   
                    'Content-Type': 'multipart/form-data',           
                    'X-CSRFToken': toquen,
                }
            })
            .then(function (response) {
                form = {
                    id: this.id_editar,
                    email: this.email,
                    password: this.password
                };
                //console.log('Formulario OK!', form);
            }),
            this.email = '';
            this.password = '';
            this.actualizarDatos();
            this.editar = false;
        },
        limpiarDatos: function(){
            this.actualizarDatos();
            this.email = '';
            this.password = '';
            this.actualizarDatos();
        },
        codificarPassword: function(){
            if (this.codificado == true){
                this.codificado = false;
            } else {
                this.codificado = true;
            };
        },
        actualizarDatos: function(){
            axios
            .get('/actualizar_datos/')
            .then(response => (
                this.datos = response.data
                //console.log('Actualizar:', this.datos)
            )),
            axios
            .get('/actualizar_datos/')
            .then(response => (
                this.datos = response.data
                //console.log('Actualizar:', this.datos)
            ))
        },
    },
    mounted () {
        this.datatables();
        this.actualizarDatos();
        this.editar = false;
        this.codificado = true;
        axios
        .get('/listar_datos/')
        .then(response => (
            this.datos = response.data
            //console.log('Base de datos:', this.datos)
        ));
    }
})
formulario.mount("#formulario")