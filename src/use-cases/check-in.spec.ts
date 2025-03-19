import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ChekInUseCase } from './chek-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: inMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: ChekInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new inMemoryCheckInsRepository()
    gymsRepository = new inMemoryGymsRepository()

    sut = new ChekInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JS Gym',
      description: '',
      phone: '',
      latitute: new Decimal(-14.8478133),
      longitude: new Decimal(-40.867746),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8478133,
      userLongitude: -40.867746,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8478133,
      userLongitude: -40.867746,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -14.8478133,
        userLongitude: -40.867746,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8478133,
      userLongitude: -40.867746,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8478133,
      userLongitude: -40.867746,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JS Gym',
      description: '',
      phone: '',
      latitute: new Decimal(-14.8683994),
      longitude: new Decimal(-40.7390878),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -14.9978133,
        userLongitude: -40.867746,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
