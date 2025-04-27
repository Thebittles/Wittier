
import Layout from '../components/Layout';

import ResourceCard from '../components/ResourceCard';
export default function Home() {

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Search Austin Community Resources</h1>
      <form onSubmit={handleSubmit} className="flex gap-4 search-form">
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Search
        </button>
      </form>
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
        link="https://example.com/insurance"
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
    </Layout>
  );
}



