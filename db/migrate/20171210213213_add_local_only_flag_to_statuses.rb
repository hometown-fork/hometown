# frozen_string_literal: true

class AddLocalOnlyFlagToStatuses < ActiveRecord::Migration[5.1]
  def change
    add_column :statuses, :local_only, :boolean # rubocop:disable Rails/ThreeStateBooleanColumn
  end
end
