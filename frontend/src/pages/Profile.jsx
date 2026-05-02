import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/ui';
import { FormInput } from '../components/shared';
import { Formik, Form } from 'formik';
import SEO from '../components/shared/SEO';

const Profile = () => {
  const { user } = useSelector(state => state.auth);

  const toggleSettings = [
    { label: 'Only Safe Mode by Default', desc: 'Auto-filter restaurants below 80 score.', enabled: true },
    { label: 'Hygiene Alerts', desc: 'Notify me when my favorites have new inspections.', enabled: true },
    { label: 'Dietary Verifications', desc: 'Check ingredients against my health profile.', enabled: false },
  ];

  return (
    <div className="p-6 md:p-10 animate-in fade-in duration-700">
      <SEO title="Profile Settings" description="Manage your SafeBite account, hygiene preferences, and security settings." url="https://safebite.app/profile" />
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and transparency preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Account Info Form */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="p-8 bg-white dark:bg-surface-dark border-none shadow-sm">
              <h2 className="text-xl font-bold mb-6">Personal Details</h2>
              <Formik
                initialValues={{ 
                  fullName: user?.fullName || '', 
                  email: user?.email || '', 
                  phone: user?.phone || '' 
                }}
                onSubmit={(values) => console.log(values)}
              >
                <Form className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput name="fullName" label="Full Name" />
                      <FormInput name="email" label="Email" type="email" disabled />
                   </div>
                   <FormInput name="phone" label="Phone Number" />
                   
                   <div className="pt-4 flex justify-end">
                      <Button type="submit">Update Profile</Button>
                   </div>
                </Form>
              </Formik>
           </Card>

           <Card className="p-8 bg-white dark:bg-surface-dark border-none shadow-sm">
              <h2 className="text-xl font-bold mb-6">Security</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                 <div>
                    <span className="block font-bold">Change Password</span>
                    <span className="text-xs text-gray-500">Update your account password regularly.</span>
                 </div>
                 <Button variant="outline" size="sm">Update</Button>
              </div>
           </Card>
        </div>

        {/* Preferences Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="p-6 bg-white dark:bg-surface-dark border-none shadow-sm">
              <h3 className="font-bold mb-4">Safety Preferences</h3>
              <div className="space-y-6">
                 {toggleSettings.map((s, i) => (
                    <div key={i} className="flex items-start justify-between">
                       <div className="pr-4">
                          <span className="block font-bold text-sm">{s.label}</span>
                          <span className="block text-xs text-gray-500">{s.desc}</span>
                       </div>
                       <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${s.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${s.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                       </div>
                    </div>
                 ))}
              </div>
           </Card>

           <Card className="p-6 bg-risk-orange/5 border border-risk-orange/10 shadow-none">
              <h3 className="font-bold text-risk-orange text-sm uppercase tracking-wider mb-2">Danger Zone</h3>
              <p className="text-xs text-gray-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
              <Button variant="ghost" className="w-full text-risk-orange hover:bg-risk-orange/10" size="sm">
                 Delete Account
              </Button>
           </Card>
        </div>

      </div>
    </div>
  );
};

export default Profile;
