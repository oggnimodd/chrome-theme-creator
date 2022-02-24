import React, { useState } from 'react';
import ImagePicker from '../../lib/file-picker/ImagePicker';
import { PanelWrapper } from '../../common/PanelWrapper';
import {
  OptionItem,
  Options,
  OptionTitle,
  OptionDescription,
  ErrorMessage,
  FileName,
} from './Basic.style';
import Button from '../../common/Button/Button';
import ColorThief from '../../lib/color-thief/color-thief';
import usePaletteStore from '../../store/usePaletteStore';
import useImagesStore from '../../store/useImagesStore';

const Basic = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [imageName, setImageName] = useState('');
  const changePallete = usePaletteStore((state) => state.changePallete);
  const backgroundImage = useImagesStore((state) => state.images.frame);
  const updateValue = useImagesStore((state) => state.updateValue);

  const handleUploadSuccess = (base64, fileObject) => {
    const name = fileObject.name;
    setImageName(name);
    setErrorMessage('');
    // Handle image here
    // Change theme background
    updateValue('frame', base64);
  };

  const handleUploadFailed = (errMsg) => {
    if(errMsg.indexOf('Must upload a file of type') > -1) {
      setErrorMessage(' File type is not supported');
      setImageName('');
    }
  };

  const extractColors = () => {
    if(backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      const palette = ColorThief.prototype.getPalette(img, 8);
      console.log(palette);

      changePallete(palette);
    }
  };

  return (
    <PanelWrapper>
      <Options>
        <OptionItem>
          <OptionTitle>1. Select an image</OptionTitle>
          <OptionDescription>
            Upload an image as a background. Only <span>*.jpg</span>, <span>*.jpeg</span>, <span>*.png</span> and <span>*.gif</span> images will be accepted
          </OptionDescription>
          <ImagePicker
            dims={{
              minWidth: 100, maxWidth: 10000, minHeight: 100, maxHeight: 10000,
            }}
            onChange={handleUploadSuccess}
            onError={handleUploadFailed}
            extensions={['jpg', 'jpeg', 'png', 'gif']}
          >
            <Button>Select image</Button>
          </ImagePicker>
          {
            errorMessage && <ErrorMessage>*{errorMessage}</ErrorMessage>
          }
          {
            !errorMessage && backgroundImage && imageName && <FileName>{imageName}</FileName>
          }

        </OptionItem>

        <OptionItem>
          <OptionTitle>2. Generate Colors</OptionTitle>
          <OptionDescription>
            Generate a color palette for your theme that is generated from the background image
          </OptionDescription>
          <Button onClick={extractColors}>Generate Color</Button>
        </OptionItem>
        <OptionItem>

          <OptionTitle>3. Export Theme</OptionTitle>
          <OptionDescription>
            Export and download your theme as a <span>.zip </span>  file. Check out how to install <a href="#">here</a>
          </OptionDescription>
          <Button>Export and Download</Button>
        </OptionItem>
      </Options>
    </PanelWrapper>
  );
};

export default Basic;
