import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import type { User } from '../models/user.model';
import UserTable from './UserTable.vue';

const users: User[] = [
  {
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
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    address: {
      street: '456 Side St',
      suite: 'Apt 2',
      city: 'Gotham',
      zipcode: '67890',
      geo: { lat: '1', lng: '1' }
    },
    phone: '555-5678',
    website: 'janesmith.com',
    company: { name: 'Globex Corp', catchPhrase: 'Innovate!', bs: 'synergy' }
  }
];

describe('UserTable', () => {
  it('renders all users', () => {
    const wrapper = mount(UserTable, {
      props: {
        users,
        onUserClick: vi.fn(),
        onDeleteUser: vi.fn()
      }
    });
    expect(wrapper.findAll('tbody tr').length).toBe(users.length);
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('Jane Smith');
  });

  it('calls onUserClick when a row is clicked', async () => {
    const onUserClick = vi.fn();
    const wrapper = mount(UserTable, {
      props: {
        users,
        onUserClick,
        onDeleteUser: vi.fn()
      }
    });
    await wrapper.findAll('tbody tr')[0].trigger('click');
    expect(onUserClick).toHaveBeenCalledWith(users[0]);
  });

  it('calls onDeleteUser when X button is clicked', async () => {
    const onDeleteUser = vi.fn();
    const wrapper = mount(UserTable, {
      props: {
        users,
        onUserClick: vi.fn(),
        onDeleteUser
      }
    });
    await wrapper.findAll('button.tableCloseBtn')[0].trigger('click');
    expect(onDeleteUser).toHaveBeenCalledWith(users[0].id);
  });

  it('renders user details correctly', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: [users[0]],
        onUserClick: vi.fn(),
        onDeleteUser: vi.fn()
      }
    });
    expect(wrapper.text()).toContain(users[0].email);
    expect(wrapper.text()).toContain(users[0].address.street);
    expect(wrapper.text()).toContain(users[0].company.name);
  });
}); 