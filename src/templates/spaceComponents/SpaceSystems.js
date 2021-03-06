import React from 'react';
import Img from "gatsby-image"
import Carousel from './Carousel';


class Systems extends React.Component {

  render() {
    return (
      <article>
        <section>
          <h2> 
            <span id='where-how'></span>
            Where & How to 
          </h2>   
          <div className='system'>

            {this.props.systems.map(system => { 
              
              let systemDescription, stepDescription

              if(system.systemDescription) { 
                systemDescription = <div className='description' key={system.id} dangerouslySetInnerHTML={{ __html: system.systemDescription.childMarkdownRemark.html }} />
              }

              if(system.steps.length === 1) {
                if(system.steps[0].description) { 
                  stepDescription = <p key={system.steps[0].id} dangerouslySetInnerHTML={{ __html: system.steps[0].description.childMarkdownRemark.html }} />
                }                
                return(
                  <section 
                    key={system.id} 
                    className='sub-section' 
                    >

                    <div className='section-component-title-desc'>
                      <h2>
                        <span id={system.spaceSystems.split(' ').join('')}></span>
                        {system.spaceSystems}
                      </h2>
                      {systemDescription}
                    </div>
                    <div key={system.steps[0].id} >
                      <div className='section-component'>
                        <Img fluid={system.steps[0].photo.fluid} className='system-photo' />
                        <div className='caption'>
                          <h4>{system.steps[0].title}</h4>
                          {stepDescription}
                        </div>
                      </div>
                      
                    </div>
                  </section>
                )
              } else { 
                return(
                  <section 
                    key={system.id} 
                    className='sub-section' 
                    >

                    <div className='section-component-title-desc'>
                      <h2>
                        <span id={system.spaceSystems.split(' ').join('')}></span>
                        {system.spaceSystems}
                      </h2>
                      {systemDescription}
                    </div>

                    <Carousel steps={system.steps}/>

                  </section>                    
                  
                )
              }
            })}

          </div>
        </section>
      </article>      
    )
  }
}


export default Systems; 