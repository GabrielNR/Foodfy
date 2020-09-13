function abrirReceita(index) {
        window.location.href = `/receitas/${index}`

}

function abrirChef(index) {
        window.location.href = `/chefs/${index}`

}

function esconder(element, id) {
        let elements = document.querySelector(`.${element}`);
        let button = document.querySelector(`span#${id}`)

        if (elements.classList == `${element} none`) {
                elements.classList.remove('none');
                button.innerHTML = 'ESCONDER'
        } else {
                elements.classList.add('none');
                button.innerHTML = 'MOSTRAR'

        }

        console.log(element)


}

function newIngredient() {
        const ingredients = document.querySelector("#ingredients")
        const newIngredient = document.querySelectorAll(".new_ingredients");
        const spanHidden = document.querySelector(".span_ing")


        const newField = newIngredient[newIngredient.length - 1].cloneNode(true);


        if (newField.children[0].value == "") {
                alert("Preencher campo vazio")
                return false
        }

        if (spanHidden.classList == "material-icons span_ing hidden") {
                spanHidden.classList = "material-icons"
        }


        newField.children[0].value = "";

        ingredients.appendChild(newField)

}

function removeIngredient(span) {
        const ingredients = document.querySelector("#ingredients")

        const field = span.parentNode;

        ingredients.removeChild(field)

}

function newPreparation() {
        const preparations = document.querySelector("#preparation")
        const newPreparation = document.querySelectorAll(".new_preparation");
        const spanHidden2 = document.querySelector(".span_prep")


        const newField = newPreparation[newPreparation.length - 1].cloneNode(true);

        if (newField.children[0].value == "") {
                alert("Preencher campo vazio")
                return false
        }

        if (spanHidden2.classList == "material-icons span_prep hidden2") {
                spanHidden2.classList = "material-icons"
        }


        newField.children[0].value = "";

        preparations.appendChild(newField)

}

function removePreparation(span) {
        const preparations = document.querySelector("#preparation")

        const field = span.parentNode;

        preparations.removeChild(field)

}


const PhotosUpload = {
        input: "",
        uploadLimit: 5,
        preview: document.querySelector('#photos-preview'),
        files: [],
        handleFileInput(event) {
                const {
                        files: fileList
                } = event.target;
                PhotosUpload.input = event.target;

                if (PhotosUpload.hasLimit(event)) return

                Array.from(fileList).forEach(file => {

                        PhotosUpload.files.push(file)
                        const reader = new FileReader()

                        reader.onload = () => {
                                const image = new Image()
                                image.src = String(reader.result)

                                const div = PhotosUpload.getContainer(image)

                                PhotosUpload.preview.appendChild(div)
                        }

                        reader.readAsDataURL(file)
                })

                PhotosUpload.input.files = PhotosUpload.getAllFiles()
        },
        hasLimit(event) {
                const {
                        uploadLimit,
                        input,
                        preview
                } = PhotosUpload

                const {
                        files: fileList
                } = input

                if (fileList.length > uploadLimit) {
                        alert(`Envie no máximo ${uploadLimit} fotos!`)
                        event.preventDefault()
                        return true
                }

                const photosDiv = []
                preview.childNodes.forEach(item => {
                        if (item.classList && item.classList.value == "photo")
                                photosDiv.push(item)
                })

                const totalPhotos = fileList.length + photosDiv.length
                if (totalPhotos > uploadLimit) {
                        alert("Você atingiu o limite máximo de fotos")
                        event.preventDefault()
                        return true
                }



                return false
        },
        getAllFiles() {
                const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

                PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

                console.log(dataTransfer)
                return dataTransfer.files
        },
        getContainer(image) {
                const container = document.createElement('div')
                container.classList.add('photo')
                container.onclick = PhotosUpload.removePhoto
                container.appendChild(image)
                container.appendChild(PhotosUpload.getRemoveButton())

                return container
        },
        getRemoveButton() {
                const button = document.createElement("i")
                button.classList.add('material-icons')
                button.innerHTML = "close"

                return button
        },
        removePhoto(event) {
                const photoDiv = event.target.parentNode
                const photosArray = Array.from(PhotosUpload.preview.children)
                const index = photosArray.indexOf(photoDiv)

                PhotosUpload.files.splice(index, 1)
                PhotosUpload.input.files = PhotosUpload.getAllFiles()

                photoDiv.remove();
        },
        removeOldPhoto(event) {
                const photoDiv = event.target.parentNode

                if (photoDiv.id) {
                        const removedFiles = document.querySelector('input[name="removed_files"]')
                        if (removedFiles) {
                                removedFiles.value += `${photoDiv.id}, `
                        }
                }

                photoDiv.remove()
        }

}

const ImageGallery = {
        highlight: document.querySelector('.gallery .highlight > img'),
        previews: document.querySelectorAll('.gallery-preview img'),
        lightboxImage: document.querySelector(".lightbox-target img"),
        setImage(e) {
                const {
                        target
                } = e

                ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
                target.classList.add('active')

                ImageGallery.highlight.src = target.src
                ImageGallery.highlight.alt = target.alt
                ImageGallery.lightboxImage.src = target.src

        },
}

const Lightbox = {
        target: document.querySelector(".lightbox-target"),
        image: document.querySelector(".lightbox-target img"),
        button: document.querySelector(".lightbox-target a.lightbox-close"),
        open() {
                Lightbox.target.style.opacity = 1
                Lightbox.target.style.top = 0
                Lightbox.target.style.bottom = 0

                Lightbox.button.style.top = 0
        },
        close() {
                Lightbox.target.style.opacity = 0
                Lightbox.target.style.top = "-100%"
                Lightbox.target.style.bottom = "initial"

                Lightbox.button.style.top = "-80px"
        }
}

const PhotoChef = {
        files: [],
        preview: document.querySelector('#avatar-preview'),
        fileInput(event) {
                let input = document.querySelector('#avatar-preview input')

                const { files : fileList } = event.target;

                if(!input) {
                        input = PhotoChef.getInput()
                        input.value = fileList[0].name
                        PhotoChef.preview.appendChild(input)
                } else {
                input.value = fileList[0].name
                }
        },
        getInput() {
                const input = document.createElement('input')
                input.type = 'text'

                return input
        }

}

const Validate = {
        apply(input, func) {
                Validate.clearErrors(input)

                let results = Validate[func](input.value)
                input.value = results.value

                if (results.error) {
                        Validate.displayError(input, results.error)
                }

        },
        displayError(input, error) {
                const div = document.createElement('div')
                div.classList.add('error')
                div.innerHTML = error
                input.parentNode.appendChild(div)
                input.focus()
        },
        clearErrors(input) {
                const errorDiv = input.parentNode.querySelector(".error")

                if (errorDiv) errorDiv.remove()
        },
        isEmail(value) {
                let error = null
                const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

                if (!value.match(mailFormat)) {
                        error = "E-mail inválido"
                }

                return {
                        error,
                        value
                }
        }
}
