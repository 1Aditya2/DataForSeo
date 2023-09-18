import { Routes,Route } from "react-router-dom";
import Home from './Home/Home';
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import toast,{Toaster} from 'react-hot-toast'
import { useSelector } from "react-redux";

function App() {
  const loadRef=useRef(null)
  const toastData=useSelector(state=>state.createTaskReducer.toastData)
  const isLoading=useSelector(state=>state.createTaskReducer.isLoading)
  useEffect(()=>{
    switch (toastData.type) {
      case (TOAST_SUCCESS):
        toast.success(toastData.message)
        break;
      case (TOAST_FAILURE):
        toast.error(toastData.message)  
        break 
    }
  },[toastData])

  useEffect(()=>{
    if(isLoading){
      loadRef.current?.continuousStart()
    }
    else{
      loadRef.current?.complete()
    }
  },[isLoading])
  return (
    <div className="App">
      <LoadingBar height={5} color='rgb(19, 255, 102)' ref={loadRef} />
      <div><Toaster/></div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      
    </div>
  );
}
export const TOAST_SUCCESS='toast_success'
export const TOAST_FAILURE='toast_failure'
export default App;
