class hardwareSet:
    def __init__(self):
        self.__Capacity = 0
        self.__Availability = 0

    def initialize_capacity(self, qty):
        self.__Capacity = qty
        self.__Availability = qty

    def get_availability(self):
        return self.__Availability

    def get_capacity(self):
        return self.__Capacity

    def set_capacity(self, qty):
        if qty == self.get_capacity():
            return
        if qty > self.get_capacity():
            self.__Availability += (qty - self.get_capacity())
        else:
            if self.get_availability() - (self.get_capacity() - qty) > 0:
                self.__Availability -= self.get_capacity() - qty
            else:
                self.__Availability = 0
        self.__Capacity = qty

    def check_out(self, qty):
        if qty > self.get_availability():
            self.__Availability = 0
            return -1
        else:
            self.__Availability -= qty
            return 0

    def check_in(self, qty):
        if qty > self.get_capacity() - self.get_availability():
            self.__Availability = self.__Capacity
            return -1
        else:
            self.__Availability += qty
            return 0

    def get_checkedout_qty(self):
        return self.__Capacity - self.__Availability
    