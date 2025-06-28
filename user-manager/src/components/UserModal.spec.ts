import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import type { User } from '../models/user.model';
import UserModal from './UserModal.vue';

const user: User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 1',
    city: 'Metropolis',
    zipcode: '12345',
    geo: { lat: '0', lng: '0' }
  },
  phone: '555-1234',
  website: 'johndoe.com',
  company: { name: 'Acme Inc', catchPhrase: 'We build stuff', bs: 'business' }
};

describe('UserModal', () => {
  it('renders when open and user is provided', () => {
    const wrapper = mount(UserModal, {
      props: {
        user,
        open: true,
        onClose: vi.fn()
      },
      global: { stubs: { teleport: true } },
      attachTo: document.body
    });
    expect(wrapper.text()).toContain(user.name);
    expect(wrapper.text()).toContain(user.email);
    expect(wrapper.text()).toContain(user.address.street);
    expect(wrapper.text()).toContain(user.company.name);
  });

  it('does not render when open is false', () => {
    const wrapper = mount(UserModal, {
      props: {
        user,
        open: false,
        onClose: vi.fn()
      },
      global: { stubs: { teleport: true } },
      attachTo: document.body
    });
    expect(wrapper.html()).not.toContain(user.name);
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const wrapper = mount(UserModal, {
      props: {
        user,
        open: true,
        onClose
      },
      global: { stubs: { teleport: true } },
      attachTo: document.body
    });
    const btn = wrapper.find('button.closeBtn');
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn();
    const wrapper = mount(UserModal, {
      props: {
        user,
        open: true,
        onClose
      },
      global: { stubs: { teleport: true } },
      attachTo: document.body
    });
    const overlay = wrapper.find('.overlay');
    expect(overlay.exists()).toBe(true);
    await overlay.trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = vi.fn();
    mount(UserModal, {
      props: {
        user,
        open: true,
        onClose
      },
      global: { stubs: { teleport: true } },
      attachTo: document.body
    });
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);
    // Wait for the event loop to process
    await new Promise(r => setTimeout(r, 10));
    expect(onClose).toHaveBeenCalled();
  });
}); 