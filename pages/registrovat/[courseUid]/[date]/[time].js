import React, {useState} from 'react';
import { getAllTimeslots, getCourseAndTimeslots } from '../../../../lib/api';
import parseJsonDate from 'date-fns/parseJSON';
import formatDate from 'date-fns-tz/format';
import { getDateAndTimeText } from '../../../../lib/utils';
import { useRouter } from 'next/router';
import { getStaticPropsWithNavigationData } from '../../../../lib/globalProps';
import TextInput from '../../../../components/form/TextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextArea from '../../../../components/form/TextArea';
import ReCAPTCHA from 'react-google-recaptcha';
import Head from 'next/head';
import Button from '../../../../components/form/Button/Button';

const schema = yup.object().shape({
  child: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  }),
  parent: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
  }),
});

export default function Registration({ course, timeslot }) {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, reset } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const [recaptcha, setRecaptcha] = useState(undefined);
  const onSubmit = props => console.log(props);

  if (router.isFallback) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  } else {
    if (typeof window !== 'undefined' && !timeslot) {
      if (!course?._meta?.uid) {
        router.replace('/');
      } else {
        router.replace(`/kurzy/${course._meta.uid}`);
      }
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="sm:w-3/4 lg:w-2/3 mx-auto">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informácia o dieťa
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-4 lg:grid-cols-5 mt-6">
              <div className="sm:col-span-2">
                <TextInput
                  id="child.firstName"
                  label="Meno"
                  ref={register}
                  error={errors.child?.firstName?.message}
                />
              </div>
              <div className="sm:col-span-2">
                <TextInput
                  id="child.lastName"
                  label="Priezvisko"
                  ref={register}
                  error={errors.child?.lastName?.message}
                />
              </div>
              <div>
                <TextInput
                  id="child.age"
                  label="Vek"
                  ref={register}
                  error={errors.child?.age?.message}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-netural-200 pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informácia o rodičovi
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <TextInput
                  id="parent.firstName"
                  label="Meno"
                  ref={register}
                  error={errors.parent?.firstName?.message}
                />
              </div>
              <div className="sm:col-span-3">
                <TextInput
                  id="parent.lastName"
                  label="Priezvisko"
                  ref={register}
                  error={errors.parent?.lastName?.message}
                />
              </div>
              <div className="sm:col-span-3">
                <TextInput
                  id="parent.email"
                  label="Email"
                  ref={register}
                  error={errors.parent?.email?.message}
                />
              </div>
              <div className="sm:col-span-3">
                <TextInput
                  id="parent.phone"
                  label="Tel. číslo"
                  ref={register}
                  error={errors.parent?.phone?.message}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-8">
              {/*<div>*/}
              {/*  <h3 className="text-lg leading-6 font-medium text-gray-900">*/}
              {/*    Všeobecne*/}
              {/*  </h3>*/}
              {/*</div>*/}
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <TextArea
                  id="description"
                  label="Poznámka"
                  ref={register}
                  error={errors.description?.message}
                />
              </div>
              <div className="sm:col-span-4">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA}
                  onChange={setRecaptcha}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-5">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                <Button type="button" white onClick={reset} className="w-full sm:w-32 mt-3 sm:mt-0">Vymazať</Button>
                <Button type="submit" primary disabled={!recaptcha} className="w-full sm:w-32">Registrovať</Button>
            </div>
          </div>
          {/*<pre>Course: {course && JSON.stringify(course, null, '  ')}</pre>*/}
          {/*<pre>*/}
          {/*  Timeslot: {timeslot && JSON.stringify(timeslot, null, '  ')}*/}
          {/*</pre>*/}
        </form>
      );
    }
  }
}

export async function getStaticPaths() {
  const timeslots = await getAllTimeslots();
  return {
    paths:
      timeslots?.map(({ node }) => ({
        params: {
          courseUid: node.course._meta.uid,
          ...getDateAndTimeText(node.start_date_time),
        },
      })) || [],
    fallback: true,
  };
}

export const getStaticProps = getStaticPropsWithNavigationData(
  async function getStaticProps({ params, preview = false, previewData }) {
    const { courseUid, date, time } = params;
    const { course, timeslots } = await getCourseAndTimeslots(courseUid);
    const timeslot = timeslots
      ?.map(ts => ({ ...ts, ...getDateAndTimeText(ts.start_date_time) }))
      ?.find(ts => ts.date === date && ts.time === time);
    return {
      props: {
        preview,
        course: course || null,
        timeslot: timeslot || null,
      },
    };
  },
);
