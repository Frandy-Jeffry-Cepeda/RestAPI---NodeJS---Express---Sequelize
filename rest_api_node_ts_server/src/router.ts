import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"


const router = Router()

router.get('/', getProduct)

router.get('/:id',

    param('id').isInt().withMessage("Id no válido"),
    handleInputErrors,
    getProductById)

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),

    handleInputErrors,

    createProduct
)

router.put('/:id', 
    
    body('name')
    .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio de Producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no válido'),
    
    body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'),
    
    handleInputErrors,

    updateProduct
) 

router.patch('/:id', 
    param('id').isInt().withMessage("Id no válido"),
    handleInputErrors,
    updateAvailability
)


router.delete('/:id',
    param('id').isInt().withMessage("Id no válido"),
    handleInputErrors, 
    deleteProduct
)

export default router