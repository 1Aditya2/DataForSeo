import {configureStore} from '@reduxjs/toolkit'
import createTaskReducer from './DataForSeoSlice'

export default configureStore({
    reducer:{
        createTaskReducer,
    }
})