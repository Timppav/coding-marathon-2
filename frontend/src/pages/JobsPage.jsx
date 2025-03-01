import JobListings from '../components/JobListings';

const JobsPage = ({jobAdd, jobUpdate, jobDelete}) => {
  return (
    <section className='bg-blue-50 px-4 py-6'>
      <JobListings jobAdd={jobAdd} jobUpdate={jobUpdate} jobDelete={jobDelete}/>
    </section>
  );
};
export default JobsPage;
