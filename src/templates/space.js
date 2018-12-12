import React from "react"
import { graphql } from "gatsby" // Link, 
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'
import './space.css'
import Navigation from '../components/navigation';
import UpdatesEvents from './spaceComponents/UpdatesEvents';
import AboutPhotos from './spaceComponents/AboutPhotos';
import Address from './spaceComponents/Address';
import Systems from './spaceComponents/SpaceSystems';
import SystemsMenu from './spaceComponents/SideMenuSpaceSystems';
import Messages from './spaceComponents/Messages';
import FormsMenu from './spaceComponents/SideMenuForms';
import ChecklistSchedule from './spaceComponents/ChecklistSchedule';
import Img from "gatsby-image"


// Will I still want to create internal links for these components?
// import UpdateEventMenu from './spaceComponents/SideMenuUpdateEvent';
import MessagesMenu from './spaceComponents/SideMenuMessages';



// import Typeform from './spaceComponents/typeform'; // won't build uses global or window - noop for gatsby but there might be a workaround. 

const propTypes = {
  data: PropTypes.object.isRequired,
}

class SpaceTemplate extends React.Component {


  render() {
    const space = this.props.data.contentfulSpace;
    let updates, aboutPhotos, aboutDescription, aboutAddress, 
    systems, messages, systemsMenuLink, updateEventMenuLink, messagesMenuLink, formsMenuLink, checkSchedule, cordMapComp;



    if(space.updates) {
      updates = <UpdatesEvents updates={space.updates} />
      // updateEventMenuLink = <UpdateEventMenu events={space.updates}/>
    } if (!space.updates) { 
      updates = <section> </section>
    } if (space.stockPhotos) { 
      aboutPhotos = <AboutPhotos photos={space.stockPhotos} /> 
    } if (!space.stockPhotos) {
      aboutPhotos = <section> </section>
    } if (!space.aboutSpace) {
      aboutDescription = <p> </p>
    } if (space.aboutSpace) {
      aboutDescription = <p>{space.aboutSpace.description.description}</p>
    } if (space.aboutSpace) {
      aboutAddress = <Address addresses={space.aboutSpace.addresses} /> 
    } if (space.systems2) {

      systems = <Systems systems={space.systems2} />
      systemsMenuLink = <SystemsMenu systems={space.systems2} />
    } if (space.messages) {
      messages = <Messages messages={space.messages} /> 
      messagesMenuLink = <MessagesMenu messages={space.messages}/> 
    } if (space.forms) { 
      formsMenuLink = <FormsMenu forms={space.forms}/>
    } if (space.scheduleChecklist) { 
      checkSchedule = <ChecklistSchedule scheduleChecklist={space.scheduleChecklist} />
    } if (space.cordMap) { 
      cordMapComp = <Img fluid={space.cordMap.fluid} className='system-photo' />
    }


    return (

      <div className='screen'>

        <Helmet title={`Space Guide - ${space.spaceName}`}>
          <html lang="en" />
        </Helmet>

        <Navigation /> 

        <div className='page-container'>
          <div className='main'>
            
            <article>
              {aboutPhotos}


              <div >
                <section>

                  <h2> 
                    <span id='about-space'></span>
                    About {space.spaceName} 
                  </h2>
                </section>
                <section>
                  <div className='sub-section'>
                    <h3> Description </h3>
                    {aboutDescription} 
                  </div>
                </section>

                <section>
                  <div>
                    {aboutAddress}
                  </div>
                </section>
              </div>
            </article>


          {/*    if update is empty?     */}
                {updates}
                {checkSchedule}                                
                {systems}


            <article>
              <section>
                <h2> 
                  <span id='cord-map'></span>
                  Cord Map 
                </h2>
                <div className='system'>
                  {cordMapComp}
                </div>

                
              </section>
            </article>

            
            <article>
              <section>
                <h2>
                  <span id='messages'></span>
                  Messages
                </h2>
                {messages}
              </section>
            </article> 

            <div className='end'> </div>           
          </div>




          <div className='sidenav-container'>
            <div className='sidenav-layout'>
              {/*<h1 className='space'>{space.spaceName} Guide</h1>*/}

              <h2> 
                <a href='#about-space'> 
                  About {space.spaceName} 
                </a>
              </h2>



              <h2> 
                <a href='#updates-events'> 
                  Updates & Events
                </a>
              </h2>
              

              <h2> 
                <a href='#schedule'> 
                  Schedule
                </a>
              </h2>



              <h2> 
                <a href='#where-how'> 
                  Where & How To 
                </a>
              </h2>
               {systemsMenuLink}

              <h2> 
                <a href='#cord-map'> 
                  Cord Map
                </a>
               </h2>

              <h2> 
                <a href='#messages'> 
                  Messages 
                </a>
              </h2>
                {messagesMenuLink}

              <div className='forms-checklist'>
              <h2> Forms & Checklists </h2>
                {formsMenuLink}
              </div>

              
              


            </div>
          </div>          

        </div>  
      </div>
    )
  }
}

SpaceTemplate.propTypes = propTypes

export default SpaceTemplate

export const pageQuery = graphql`
query($id: String!){
  contentfulSpace(id: {eq: $id}) {
    id
    spaceName
    stockPhotos{
      id
      fluid(maxWidth: 2000, maxHeight: 1000) {
        ...GatsbyContentfulFluid
      }
    }
    systems2 {
      id
      spaceSystems
      systemDescription {
        childMarkdownRemark {
          html
        }
      }
      steps {
        id
        title
        photo {
          id
          fluid(maxWidth: 800, maxHeight: 600) {
            ...GatsbyContentfulFluid
          }
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }

    updates{
      id
      title
      date
      message{
        message
      }
    }
    scheduleChecklist{
      id
      checklist{
        childMarkdownRemark{
          html
          excerpt
        }
      }
    }
    aboutSpace{
      phoneNumber
      hours{
        typeDay
        militaryTime
        closeMilitaryTime
        open2MilitaryTime
        close2MilitaryTime
      }
      contacts{
        id
        name
        position
      }
      addresses{
        id
        type
        title
        street{
          lat
          lon
        }
      }
      socialMediaLinks{
        id
        type
        url
      }
      description{
        description
      }
    }
    
    forms{
      id
      type
      url
    }
    messages{
      id
      timeMilitary
      title
      message{
        id
        message
      }
    }
    
    cordMap{
      fluid(maxWidth: 800, maxHeight: 600) {
        ...GatsbyContentfulFluid
      }
    }    

  }
}

`