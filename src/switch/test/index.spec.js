import Switch from '..';
import { mount } from '@vue/test-utils';

test('should emit update:modelValue event when click the switch button', async () => {
  const wrapper = mount(Switch);

  wrapper.trigger('click');
  expect(wrapper.emitted('update:modelValue').length).toEqual(1);
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(true);

  await wrapper.setProps({ modelValue: true });
  wrapper.trigger('click');
  expect(wrapper.emitted('update:modelValue').length).toEqual(2);
  expect(wrapper.emitted('update:modelValue')[1][0]).toEqual(false);
});

test('should emit change event when click the switch button', async () => {
  const wrapper = mount(Switch);

  wrapper.trigger('click');
  expect(wrapper.emitted('change').length).toEqual(1);
  expect(wrapper.emitted('change')[0][0]).toEqual(true);

  await wrapper.setProps({ modelValue: true });
  wrapper.trigger('click');
  expect(wrapper.emitted('change').length).toEqual(2);
  expect(wrapper.emitted('change')[1][0]).toEqual(false);
});

test('should not emit change event or update:modelValue event if disabled', async () => {
  const wrapper = mount(Switch, {
    props: {
      disabled: true,
    },
  });

  wrapper.trigger('click');
  expect(wrapper.emitted('change')).toBeFalsy();
  expect(wrapper.emitted('update:modelValue')).toBeFalsy();
});

test('should change active color when using active-color prop', () => {
  const wrapper = mount(Switch, {
    props: {
      modelValue: true,
      activeColor: 'black',
    },
  });

  expect(wrapper.element.style.backgroundColor).toEqual('black');
});

test('should change inactive color when using inactive-color prop', () => {
  const wrapper = mount(Switch, {
    props: {
      inactiveColor: 'black',
    },
  });

  expect(wrapper.element.style.backgroundColor).toEqual('black');
});

test('should apply active color to loading icon', () => {
  const wrapper = mount(Switch, {
    props: {
      loading: true,
      modelValue: true,
      activeColor: 'red',
    },
  });

  const loading = wrapper.find('.van-switch__loading');
  expect(loading.html()).toMatchSnapshot();
});

test('should apply inactive color to loading icon', () => {
  const wrapper = mount(Switch, {
    props: {
      loading: true,
      inactiveColor: 'black',
    },
  });

  const loading = wrapper.find('.van-switch__loading');
  expect(loading.html()).toMatchSnapshot();
});

test('should change size when using size prop', () => {
  const wrapper = mount(Switch, {
    props: {
      size: 20,
    },
  });

  expect(wrapper.element.style.fontSize).toEqual('20px');
});

test('should allow to custom active-value and inactive-value', () => {
  const wrapper = mount(Switch, {
    props: {
      modelValue: 'on',
      activeValue: 'on',
      inactiveValue: 'off',
    },
  });

  expect(wrapper.find('.van-switch--on').exists()).toBeTruthy();

  wrapper.trigger('click');
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('off');
});
