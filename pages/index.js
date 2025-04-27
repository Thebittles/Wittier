
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';
import ResourceCard from '../components/ResourceCard';

export default function Home() {
  // Search Section
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);


  const Map = useMemo(() => dynamic(() => import('../components/MyMap'), {
    loading: () => <p>Loading map...</p>,
    ssr: false
  }), []);



  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
    <div className='container'>
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold mb-8">Search Austin Community Resources</h1>
          <div className="mt-8">
            {loading ? <p>Thinking...</p> : <p>{output}</p>}
          </div>
        </div>
        <div className="resources-container">
          <ResourceCard
            // title="Mental Health Resources"
            description="Free and Low-cost Mental Health Programs"
            // description1="first aid, heimlich, CPR, bullet wound Treatment"
            link="https://example.com/rent"
            image="MentalHealthResources.jpg"
          />
          <ResourceCard
            // title="Domestic Violence Help"
            description="Hotlines , Shelters, Informations "
            link="/domestic-violence"
            image="DomesticViolenceHelp.jpg"
          />
          <ResourceCard
            // title="Emergency Resources & Videos"
            description="First aid, Heimlich, Cpr"
            link="/emergency"
            image="Emergency.jpg"
          />
          <ResourceCard
            // title="Urgent and Important News"
            description="City News, Local Neighborhood News "
            link="/news"
            image="/Urgent.jpg"
          />
          <ResourceCard
            // title="Weather Conditions/Emergency Resources"
            description="Weather Advisory."
            link="https://example.com/rent"
            image="WeatherConditions_EmergencyResources.jpg"
          />
          <ResourceCard
            // title="Transportation/Traffic/Road Resources and Bulletin Notifications"
            description="CapMetro Information,Event Traffic Closures."
            link="https://example.com/childcare"
            image="/Transportation.jpg"
          />

          <ResourceCard
            // title="Parental Assistance/Programs"
            description="Child care, Holiday and Summer Programs."
            link="https://example.com/insurance"
            image="ParentalAssistance,Programs.jpg"
          />

          <ResourceCard
            // title="Senior Citizen and Disabled Citizen Resources"
            description="Elder abuse hotline, Local disablity."
            link="https://example.com/childcare"
            // image="Transportation_Traffic_Roa BulletinNotifications.jpg"
            image="CitizenandDisabledCitizenResources.jpg"
          />
        </div>
      </div>
      <div className="callout">
        <div className="w-full inset">
          <h1 className="text-4xl font-bold text-center mb-8">See Resources Near You!</h1>
          <div className="w-full map-container" style={{ height: "600px" }}>
            <Map />
          </div>
        </div>
      </div>

    </Layout>
  );
}



