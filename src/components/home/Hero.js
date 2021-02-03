import React from 'react';
import { Button } from 'antd';

import { Carousel } from 'antd';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';

function AppHero({ text }) {
  return (
    <div id='hero' className='heroBlock'>
      <Carousel>
        <div className='container-fluid'>
          <div className='content'>
            <h3>
              <Typewriter
                options={{
                  strings: text,
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>

            <div className='btnHolder'>
              <Button type='primary' size='large'>
                <Link to='/shop'>Shop Now </Link>
              </Button>
              <Button size='large' danger>
                <Link to='/contact'>Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default AppHero;
