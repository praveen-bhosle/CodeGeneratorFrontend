import { createRoot } from 'react-dom/client'
import './index.css'
import {  BrowserRouter  , Routes , Route } from 'react-router-dom' ; 
import Index from './components/Index.tsx';
import ProjectPage from './components/ProjectPage.tsx';
import ErrorPage from './components/ErrorPage.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 
  <Routes> 
     <Route path="" > 
        <Route index element = {<Index/>} /> 
        <Route  path={"/~/:id"} element = { <ProjectPage/>} /> 
        <Route path="/error"  element = { <ErrorPage /> } /> 
      </Route> 
  </Routes> 
  </BrowserRouter>
)
