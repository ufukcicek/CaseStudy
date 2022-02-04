import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    padding: 5px 5px;
    flex-direction: column;
    margin-bottom: 20px;
    border-style: solid;
    border-color: #656565;
    border-width: 2px;
    border-radius: 9px;
    #text-align: center;
    width: 215px;
    height: 350px;
    background-color: white;
 
`

export const BoxUpload = styled.div`
    display: grid;
    place-items: center;
    position: relative;

    height: 165px;
    width: 200px;

    background: #e2b6a7;

    .image-upload {
        display: flex;
        flex-wrap:wrap;

        label {
            cursor: pointer;
        
            :hover {
                opacity: .75;
            }
        }

        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;

    #uploaded-image{
        height: 165px;
        width: 200px;
        object-fit: cover;
    }
`