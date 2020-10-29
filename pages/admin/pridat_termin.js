import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../../components/form/TextInput';
import Button from '../../components/form/Button/Button';
import { getStaticPropsWithNavigationData } from '../../lib/globalProps';
import DatePicker from 'react-datepicker';

const schema = yup.object().shape({
  capacity: yup.number().positive().integer().required(),
  dayInWeek: yup.string().required(),
  time: yup.string().required(),
  startDate: yup.string().required(),
  finishDate: yup.string().required(),
});

const ExampleCustomInput = ({ value, theRef, ...props }) => {
  return <TextInput id="startDate" label="Začiatok" {...props} className="w-full" ref={theRef} />;
};

export default function PridatTermin() {
  const { register, handleSubmit, watch, errors, reset } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const onSubmit = data => console.log(data);

  return (
    <div className="w-3/4 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="capacity"
          label="Kapacita"
          error={errors.capacity?.message}
          ref={register}
          type="number"
        />
        <TextInput
          id="startDate"
          label="Začiatok"
          error={errors.startDate?.message}
          ref={register}
          type="date" lang="sk"
        />
        <TextInput
          id="finishDate"
          label="Koniec"
          error={errors.finishDate?.message}
          ref={register}
          type="date"
        />
        <TextInput
          id="time"
          label="Čas"
          error={errors.time?.message}
          ref={register}
          type="time"
        />
        <TextInput
          id="dayInWeek"
          label="Deň v týždni"
          error={errors.dayInWeek?.message}
          ref={register}
          type="text"
        />

        <div className="w-full">
          <DatePicker
            customInput={<ExampleCustomInput />}
            customInputRef="theRef"
            popperPlacement="right-start"
            popperModifiers={{
              offset: { offset: '0, 0' },
              preventOverflow: {
                escapeWithReference: false
              }
            }}
            className="m-10"
          />
        </div>
        <Button type="submit" primary className="w-full sm:w-32">
          Vytvoriť
        </Button>
      </form>
    </div>
  );
}

export const getStaticProps = getStaticPropsWithNavigationData();
