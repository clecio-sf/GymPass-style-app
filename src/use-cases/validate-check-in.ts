import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateValidationError } from './errors/late-check-in-validation-error'

interface ValidateChekInUseCaseRequest {
  checkInId: string
}

interface ValidateChekInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private chekInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateChekInUseCaseRequest): Promise<ValidateChekInUseCaseResponse> {
    const checkIn = await this.chekInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateValidationError()
    }

    checkIn.validated_at = new Date()

    await this.chekInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
