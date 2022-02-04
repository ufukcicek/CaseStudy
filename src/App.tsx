import React, { useEffect, useRef, useState } from 'react';
import { Container, BoxUpload, ImagePreview } from "./style";
import './style.css';
import Button from '@mui/material/Button';


type FormElement = React.FormEvent<HTMLFormElement>;
interface IData {
  title: string;
  description: string;
  imagesrc: string;
}

function App() {

  const titleplaceHolder = "New title";
  const descriptionPlaceHolder = "New description";

  const [newTitle, setNewTitle] = useState<string>(titleplaceHolder);
  const [newDescription, setNewDescription] = useState<string>(descriptionPlaceHolder);
  const [datas, setDatas] = useState<IData[]>([]);

  const dataInput = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File|null>();
  const [preview, setPreview] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview("");
    }
  }, [image])

  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    addData(newTitle, newDescription, preview)
    setNewTitle(titleplaceHolder);
    setNewDescription(descriptionPlaceHolder);
    setImage(null);
    setIsUploaded(false);
    dataInput.current?.focus();
  }


  const addData = (title: string, description: string, imagesrc: string) => {
    const newDatas: IData[] = [...datas, { title, description, imagesrc }]
    setDatas(newDatas)
  }


  return (
    <div className="app">
      <div>
        <textarea className="header" readOnly value="New Title" />
      </div>
      <Container>
        <form onSubmit={handleSubmit}>
          <input className="title"
            type="text"
            onChange={event => setNewTitle(event.target.value)}
            onClick={event => event.currentTarget.select()}
            value={newTitle}
            ref={dataInput}
            
          />
          <textarea className="description"
            onChange={event => setNewDescription(event.target.value)}
            onClick={event => event.currentTarget.select()}
            value={newDescription}
          />

          <BoxUpload>
            <div className="image-upload">
              {!isUploaded ? (
                <>
                  <label htmlFor="upload-input">
                    <img src="addIcon.png" alt="Add Icon is here" style={{ width: 50, height: 50, marginBottom: '10px' }}/>
                  </label>

                  <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (!event.target.files) {
                        return;
                      } else {
                        setImage(event.target.files[0])
                        setIsUploaded(true)
                      }
                    }}
                  />
                </>
              ) : (
                <ImagePreview>
                
                  <img
                    id="uploaded-image"
                    src={preview}
                    draggable={false}
                    alt="uploaded-img"
                  />

                </ImagePreview>
              )}


            </div>
          </BoxUpload>
          <Button
            type="submit"
            disabled={!newTitle || !newDescription || !image}
            variant="contained"
            color="success"
            size="small"
            sx={{ minWidth: '10px' , maxWidth: '10px', height: '20px', borderRadius: 0, marginLeft: '180px', marginTop: '2px'}}>
          </Button>
        </form>
      </Container>
      <div>
        {
          datas.map((data: IData, index: number) => (
            <div>
                <textarea className="header" readOnly value="New Title" />
            
            <Container>
              <label className='title' style= {{ marginBottom: '7px' }}>{data.title}</label>
              <label className='description' style= {{ marginBottom: '7px' }}>{data.description}</label>
              <ImagePreview>
                <img id="uploaded-image" src={data.imagesrc} draggable={false} alt=""/>
              </ImagePreview>
            </Container> 

            </div>
          ))}
      </div>
    </div>
  );
}
export default App;
